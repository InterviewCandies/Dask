const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  author: {
    type: {},
  },
  content: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", Comment);
