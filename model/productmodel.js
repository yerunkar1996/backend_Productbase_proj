const mongoose = require("mongoose")

let ProductModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    PdtName : String,
    PdtPrice : String,
    PdtQty : String
})

module.exports = mongoose.model("products",ProductModel)