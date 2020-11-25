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

//상세 product불러오는 API
router.get("/:productId", (qqq, sss) => {

productModel2
    .findById(qqq.params.productId)
    .then(item => {
        sss.json({
            msg:"get product data" + item._id,
            product:item
        })
    })
    .catch(err => {
        sss.json({
            msg:err.message
        })
    })
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
router.patch("/:productId", (req, res) => {
    // res.json({
    //     message : "product의 patch 라우터"
    // })

    //수정할 내용을 정의
    const updateOps = {}

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }



    productModel2
        .findByIdAndUpdate(req.params.productId, { $set: updateOps })
        .then(() => {
            res.json({
                message: "Updated product " + req.params.productId
            })
        })
        .catch(err => {
            res.json({
                msg:err.message
            })
        })

})
//product 삭제하는 API
router.delete("/", (req, res) =>{
    // res.json({
    //     message: "product의 delete API"
    // })
    productModel2
        .delete()
        .then(() => {
            res.json({
                msg: "deleted All products"
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

//특정 product를 삭제하는 API
router.delete("/:productId", (req, res)=>{
    productModel2
        .findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                msg: "deleted product"
            })
        })

        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})



//2
module.exports = router