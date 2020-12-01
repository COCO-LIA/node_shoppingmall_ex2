//1
const mongoose = require("mongoose")

//2
const orderSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product2',
        required: true
    },
    quantity:{
        type:Number,
        default:1
    }
//4

})

//3

module.exports = mongoose.model("order2", orderSchema)