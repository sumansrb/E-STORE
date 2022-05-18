const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    //TODO: get back here for password
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.updatedAt = undefined
    req.profile.createdAt = undefined
    return res.json(req.profile)
}

// exports.getAllUsers = (req, res, next) => {
//     User.find().exec((err, users) => {
//         if(err || !users) {
//             return res.status(400).json({
//                 error: "No users are there!"
//             })
//         }
//         return res.json(users)
//         next()
//     })
// }

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id : req.profile._id },
        { $set : req.body },
        { new : true, useFindAndModify: false },
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You're not authorised to update this user"
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No order in this user"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.puh({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: product.amount,
            transaction_id: req.bosy.order.transaction_id
        })
    })
//store this in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchase) => {
            if(err) {
                return res.status(400).json({
                    error: "Unabale to save the purchase list"
                })
            }
            next()
        }
    )
}