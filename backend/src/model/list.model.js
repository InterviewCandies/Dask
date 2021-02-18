const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List = new Schema({
  tasks: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    default: "Untitled",
  },
});

module.exports = mongoose.model("List", List);
