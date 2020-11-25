//1
const mongoose = require('mongoose')


//2
const productSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: String
})

//3
module.exports = mongoose.model("product2", productSchema)

