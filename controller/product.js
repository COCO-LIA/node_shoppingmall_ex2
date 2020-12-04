const productModel2 = require('../model/product')

//전체 product 불러오는 코드
exports.products_get_all = (req, res) => {

    productModel2
        .find()
        .then(docs => {
            res.json({
                msg: "product total get",
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        category: doc.category,
                        request: {
                            type: 'GET',
                            url: "http://localhost:5001/addressproduct/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.json({
                msg:err.message
            })
        })
    // ddd.json({
    //     message : "get라우터 "
    // })
}

//상세 product 불러오는 코드
exports.products_get_product = (req, res) => {

    productModel2
        .findById(req.params.productId)
        .then(item => {
            res.json({
                msg:"get product data" + item._id,
                product:{
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    request: {
                        type:'GET',
                        url:"http://localhost:5001/addressproduct/"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                msg:err.message
            })
        })
}

//product 등록해주는 코드
exports.products_post_product = (req, res) =>{

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
                productInfo: {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    category: item.category,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5001/addressproduct/" + item._id
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })

}

//product 수정해주는 코드
exports.products_patch_product = (req, res) => {
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
                message: "Updated product " + req.params.productId,
                request:{
                    type: 'GET',
                    url: "http://localhost:5001/addressproduct/" + req.params.productId
                }
            })
        })
        .catch(err => {
            res.json({
                msg:err.message
            })
        })
}

//전체 product 삭제해주는 코드
exports.products_delete_all = (req, res) =>{
    // res.json({
    //     message: "product의 delete API"
    // })
    productModel2
        .delete()
        .then(() => {
            res.json({
                msg: "deleted All products",
                request: {
                    type: 'GET',
                    url: "http://localhost:5001/addressproduct/"
                }
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
}

//특정 product 삭제해주는 코드
exports.products_delete_product = (req, res)=>{
    productModel2
        .findByIdAndDelete(req.params.productId)
        .then(() => {
            res.json({
                msg: "deleted product",
                request:{
                    type: 'GET',
                    url: "http://localhost:5001/addressproduct/"
                }
            })
        })

        .catch(err => {
            res.json({
                msg: err.message
            })
        })
}
