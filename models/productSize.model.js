const mongoose = require('mongoose');

const productSizeSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sizeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
});

const ProductSize = mongoose.model('productSizes', productSizeSchema);
export default ProductSize;