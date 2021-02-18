const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema({
  title: {
    type: String,
    default: "Untitled",
  },
  tags: {
    type: [],
    default: [],
  },
  comments: {
    type: [],
    default: [],
  },
  description: {
    type: String,
    description: "No description",
  },
  coverURL: {
    type: String,
    default: "",
  },
  members: {
    type: [],
    default: [],
  },
  files: {
    type: [],
    default: [],
  },
});

module.exports = mongoose.model("Task", Task);
