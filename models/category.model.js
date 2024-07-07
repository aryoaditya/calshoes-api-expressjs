module.exports = mongoose => {
    const categorySchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })
    
    const Category = mongoose.model('categories', categorySchema)
    return Category
}