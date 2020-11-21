//1
const express = require("express")

const router = express.Router()

//3

//product 불러오는 API
router.get("/get", (ccc, ddd) => {
    ddd.json({
        message : "get라우터 "
    })
})


//procuct 등록해주는 API
router.post("/", (req, res) =>{

    //사용자 입력값 설정

    const productInfo = {
        name: req.body.productname,
        price: req.body.productPrice,
        category: req.body.category
    }


    res.json({
        message : "product의 post 라우터",
        product: productInfo
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