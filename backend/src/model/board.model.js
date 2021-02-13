const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Board = new Schema({
  cover_url: {
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
  blocks: {
    type: [],
  },
  owner: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Board", Board);
