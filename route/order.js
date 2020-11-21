const express = require("express")

const router = express.Router()

//order 불러오는 API
router.get("/order", (req, res) => {
    res.json({
        message : "order라우터"
    })
})

//order 등록하는 API
router.post("/", (req,res) => {
    res.json({
        message: "order의 post api"
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