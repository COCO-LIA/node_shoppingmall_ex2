//1
const express = require("express")

const router = express.Router()

const productModel2 = require('../model/product')

//3

//product 불러오는 API
router.get("/get", (qqq, sss) => {

    productModel2
        .find()
        .then(docs => {
            sss.json({
                msg: "product total get",
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            sss.json({
                msg:err.message
            })
        })



    // ddd.json({
    //     message : "get라우터 "
    // })
})


//procuct 등록해주는 API
router.post("/", (req, res) =>{

    // //사용자 입력값 설정
    //
    // const productInfo = {
    //     name: req.body.productname,
    //     price: req.body.productPrice,
    //     category: req.body.category
    // }
    //
    //
    // res.json({
    //     message : "product의 post 라우터",
    //     product: productInfo
    // })

    const productInfo = new productModel2({
        name: req.body.productname,
        price: req.body.productprice,
        category: req.body.category
    })

    productInfo
        .save()
        .then(item => {
            res.json({
                msg: "saver product2",
                productInfo: item
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })

})

//product 수정하는 API
router.patch("/", (req, res) => {
    res.json({
        message : "product의 patch 라우터"
    })
})
//product 삭제하는 API
router.delete("/", (req, res) =>{
    res.json({
        message: "product의 delete API"
    })
})

//2
module.exports = router