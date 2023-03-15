const mongoose = require("mongoose");

const ListeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  }
});

const ListeItem = mongoose.model("ListeItem", ListeItemSchema);
module.exports = ListeItem;
