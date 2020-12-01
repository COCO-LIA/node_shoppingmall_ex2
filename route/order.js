const express = require("express")

const router = express.Router()

const orderModel = require('../model/order')

//order 불러오는 API
router.get("/order", (req, res) => {
    res.json({
        message : "order라우터"
    })
})

//order 등록하는 API
router.post("/", (req,res) => {
    // res.json({
    //     message: "order의 post api"
    // })
    const orderInfo = new orderModel({
        product: req.body.productId2,
        quantity: req.body.qty2
    })

    orderInfo
        .save()
        .then(item => {
            res.json({
                msg: "장바구니담기 2",
                orderInfo: item
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

//order 수정하는 API
router.patch("/", (req, res) => {
    res.json({
        message: "order의 patch api"
    })
})

// order 삭제하는 API
router.delete("/", (req,res) => {
    res.json ({
        message: "order 의 delete api"
    })

})

module.exports = router