module.exports = mongoose => {
    const userSchema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },{
        timestamps: true
    });

    const User = mongoose.model('users', userSchema)
    return User
}