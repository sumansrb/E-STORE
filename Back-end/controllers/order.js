const { Order, Productcart } = require("../models/order")

exports.getOrderById = (Req, res, next, id) => {
    Order.findByid(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if(err) {
                return res.status(400).json({
                    error: "No order found in DB"
                })
            }
            req.order = order
            next()
    })
}

exports.createOrder = (req, res) => {
    req.body.user = req.profile
    const order = new Order(req.body.order)
    order.save((er, order) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to save yout order in DB"
            })
        }
        res.json(order)
    })
}

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((err, order) => {
            if(err) {
                res.status(400).json({
                    error: "No orders found in DB"
                })
            }
            res.json(order)
        })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req, res) => {
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order) => {
            if(err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                })
            }
            res.json(order)
        }
    )
}