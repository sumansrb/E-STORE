var express = require("express");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")
const { check, validationResult } = require('express-validator');

router.get("/signout", signout)

router.post("/signup", [
  check("name").isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  check("email", "email is required").isEmail(),
  check("password", "password should be at least 3 chars").isLength({ min: 3 })
], signup)

router.post("/signin", [
  check("email", "email is required").isEmail(),
  check("password", "password is required").isLength({ min: 1 })
], signin)

// router.get("/testroute", isSignedIn, (req, res) => {
//   res.json(req.auth)
// })


module.exports = router;
