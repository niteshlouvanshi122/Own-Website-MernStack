const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userModeal = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        includes: ("@"),
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Hash Your password
userModeal.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next()
    }
    try {
        const Soult_Round = await bcrypt.genSalt(12);

        const hash_password = await bcrypt.hash(user.password, Soult_Round);
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

// compare - Password

userModeal.methods.comparePassword = async function (password) {
    return bcrypt.compare( password, this.password );
}

// Create token
userModeal.methods.TokenGenerat = async function () {
    try {
        return jwt.sign(
            {
                user_id: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
    } catch (error) {
        console.error(error)
    }
}

const User = new mongoose.model("User", userModeal)

module.exports = User;