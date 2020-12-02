//1

const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')

const userModel = require('../model/user')

//회원가입 API
router.post("/register", (req, res) => {

    bcrypt.hash(req.body.pw, 10, (err, hash) => {

        if(err){
            return res.json({
                error: err
            })
        } else {
            const userInfo = new userModel({
                username: req.body.unm,
                email:req.body.em,
                password:hash

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
        }
    })



})



//로그인 API
router.post("/login", (req, res) => {

    })

//2
module.exports = router
