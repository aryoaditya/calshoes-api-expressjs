module.exports = mongoose => {
    const sizeSchema = mongoose.Schema({
        sizeNumber: {
            type: Number,
            required: true
        }
    });
    
    const Size = mongoose.model('sizes', sizeSchema)
    return Size
}