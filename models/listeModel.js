const mongoose = require("mongoose");

const ListeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    unique: true
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ListeItem" }]
});

const Liste = mongoose.model("Liste", ListeSchema);
module.exports = Liste;
