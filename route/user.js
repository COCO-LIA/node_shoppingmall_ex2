//1

const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')

const userModel = require('../model/user')

//회원가입 API
router.post("/register", (req, res) => {

    //DB 이메일 유무 체크 -> 패스워드 암호화 -> DB에 유저정보 저장

    userModel
        .findOne({email: req.body.em})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "중복된 이메일입니다. 다른 메일을 입력해 주십시오."
                })
            } else {
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

            }
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
