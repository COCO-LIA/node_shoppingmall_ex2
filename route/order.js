const express = require("express")

const router = express.Router()

router.get("/order", (req, res) => {
    res.json({
        message : "order라우터"
    })
})

module.exports = router