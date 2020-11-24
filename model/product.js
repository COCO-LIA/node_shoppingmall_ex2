//1
const mongoose = require('mongoose')


//2
const productSchema = mongoose.Schema({
    name : String,
    price: String,
    category: String
})

//3
module.exports = mongoose.model("product2", productSchema)

