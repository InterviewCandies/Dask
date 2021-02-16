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
});

module.exports = mongoose.model("Board", Board);
