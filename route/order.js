const express = require("express")
const router = express.Router()

const checkAuth = require('../middleware/check-auth')
const {
    order_get_all,
    order_get_order,
    order_delete_all,
    order_patch_order,
    order_post_order
} = require('../controller/order')


//order 불러오는 API
router.get("/", order_get_all )

//상세 불러오는 API
router.get("/:orderId2", checkAuth, order_get_order )

//order 등록하는 API
router.post("/", checkAuth, order_post_order)

//order 수정하는 API
router.patch("/", checkAuth, order_patch_order)

// order 삭제하는 API
router.delete("/", checkAuth, order_delete_all)

module.exports = router