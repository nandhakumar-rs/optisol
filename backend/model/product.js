// Initialization
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    productName: String,
    productCategory: String,
    productImage: String,
    productQuantity: Number,
    productDescription: String
});


// Export ideas model
module.exports = mongoose.model('product', ProductSchema);