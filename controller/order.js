
const orderModel2 = require('../model/order')


//전체 order 불러오는 코드
exports.order_get_all = (req, res) => {
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
}

//상세 order 불러오는 코드
exports.order_get_order = (req, res) => {

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
}

//order 등록하는 코드
exports.order_post_order = (req,res) => {

    const { product, quantity } = req.body;

    const orderInfo = new orderModel2({
        product,
        quantity
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
}

//order 수정하는 코드
exports.order_patch_order = (req, res) => {
    res.json({
        message: "order의 patch api"
    })
}

//전체 order 삭제하는 코드
exports.order_delete_all = (req,res) => {
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
}