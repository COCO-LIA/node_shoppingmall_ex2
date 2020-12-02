//1

const express = require("express")
const router = express.Router()

const userModel = require('../model/user')

//회원가입 API
router.post("/register", (req, res) => {

    const userInfo = new userModel({
        username: req.body.unm,
        email:req.body.em,
        password:req.body.pw

    })

    userInfo
        .save()
        .then(user => {
            res.json({
                msg: "회원가입",
                userInfo: user


            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})



//로그인 API
router.post("/login", (req, res) => {

    })

//2
module.exports = router
