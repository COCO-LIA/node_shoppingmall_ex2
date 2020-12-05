
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const userModel = require('../model/user')

//회원가입 코드
exports.user_register = (req, res) => {

    const { username, email, password } = req.body;
    //DB 이메일 유무 체크 -> 패스워드 암호화 -> DB에 유저정보 저장

    userModel
        .findOne({email})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "중복된 이메일입니다. 다른 메일을 입력해 주십시오."
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {

                    if(err){
                        return res.json({
                            error: err
                        })
                    } else {
                        const userInfo = new userModel({
                            username,
                            email,
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
}

//로그인 코드
exports.user_login = (req, res) => {

    const { email, password } = req.body;
    //이메일 유무체크 -> 패스워드 매칭-> 접속유저정보 뿌려주기(jwt 생성)
    userModel
        .findOne({ email })
        .then(uuser => {
            if(!uuser) {
                return  res.json ({
                    msg: "없는 이메일입니다. 다시 입력해 주십시오."
                })
            } else  {
                // console.log(uuser)
                bcrypt.compare(password, uuser.password, (err, isMatch) => {

                    if (err || isMatch === false) {
                        return  res.json({
                            msg: "Auth failed (password incorrected)"
                        })
                    } else {
                        // res.json(uuser)

                        //jwt 생성
                        const token = jwt.sign(
                            {id: uuser._id, email: uuser.email},
                            process.env.SECRET_KEY,
                            {expiresIn: "12h"}
                        )
                        res.json({
                            msg: "Auth successful",
                            tokenInfo: token
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

}
