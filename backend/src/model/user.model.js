const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  photoURL: {
    type: String,
  },
  email: {
    type: String,
  },
  location: {
    type: "String",
  },
  boards: {
    type: [],
  },
});

module.exports = mongoose.model("User", User);
