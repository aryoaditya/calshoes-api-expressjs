module.exports = mongoose => {
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
    
    const ProductSize = mongoose.model('product_sizes', productSizeSchema)
    return ProductSize
}