//1
const express = require("express")

const router = express.Router()


router.get("/get", (ccc, ddd) => {
    ddd.json({
        message : "get라우터 "
    })
})





//2
module.exports = router