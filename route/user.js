//1

const express = require("express")
const router = express.Router()

const {
    user_login,
    user_register
}
= require('../controller/user')


//회원가입 API
router.post("/register", user_register )

//로그인 API
router.post("/login", user_login)

//2
module.exports = router
