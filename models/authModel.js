const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 2,
    }
})

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;