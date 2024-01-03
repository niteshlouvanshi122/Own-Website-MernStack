const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        includes: ("@"),
        includes: ("gmail.com"),
        unique: true
    },
    message: {
        type: String,
        required: true,
        minlength: 10,
    },
})

const ContactModel = mongoose.model( "Contact", ContactSchema )

module.exports = ContactModel;