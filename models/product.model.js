const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        images: [{
            type: String
        }],
        brand: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: '0'
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        updatedDate: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const Product = mongoose.model('products', productSchema);
export default Product;