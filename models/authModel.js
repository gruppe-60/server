const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

authSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

authSchema.methods.publicFields = function () {
    return {
        email: this.email,
        // password: this.password,
    };
};
authSchema.methods.comparePassword = async (password, authPassword) => {
    return await bcrypt.compare(password, authPassword)
}

const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;