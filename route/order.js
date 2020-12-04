const express = require("express")
const router = express.Router()

const orderModel2 = require('../model/order')
const checkAuth = require('../middleware/check-auth')

//order 불러오는 API
router.get("/", (req, res) => {
    // res.json({
    //     message : "order라우터"
    // })

    orderModel2
        .find()
        .populate("product", ["name", "price"])
        .then(docs => {
            res.json({
                msg: "order total get",
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: "http://localhost:5001/addressorder/" + doc._id
                        }
                    }
                })
            })
        })
})

//상세 불러오는 API

router.get("/:orderId2", checkAuth, (req, res) => {

    orderModel2
        .findById(req.params.orderId2)
        .populate("product", ["name", "price"])
        .then(item => {
            res.json({
                msg: " od data" + item._id,
                orderInfo: {
                    id: item._id,
                    product: item.product,
                    quantity: item.quantity,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5001/addressorder/"
                    }
                }
            })
        })
})


//order 등록하는 API
router.post("/", checkAuth, (req,res) => {
    // res.json({
    //     message: "order의 post api"
    // })
    const orderInfo = new orderModel2({
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
router.patch("/", checkAuth, (req, res) => {
    res.json({
        message: "order의 patch api"
    })
})

// order 삭제하는 API
router.delete("/", checkAuth, (req,res) => {
    // res.json ({
    //     message: "order 의 delete api"
    // })
    orderModel2
        .deleteMany()
        .then(() => {
            res.json({
                msg: "delete order ",
                request: {
                    type: 'GET',
                    url: "http://localhost:5001/addressorder/"
                }
            })
        })
        .catch( err => {
            res.json({
                msg: err.message
            })
        })

})

module.exports = router