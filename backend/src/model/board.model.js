const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Board = new Schema({
  coverURL: {
    type: String,
  },
  title: {
    type: String,
  },
  members: {
    type: [],
  },
  visibility: {
    type: Boolean,
  },
  lists: {
    type: [],
  },
  owner: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    default: "No description",
  },
});

module.exports = mongoose.model("Board", Board);
