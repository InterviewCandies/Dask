const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Board = new Schema({
  cover: {
    type: Buffer,
    ContentType: String,
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
  owner: String,
});

module.exports = mongoose.model("Board", Board);
