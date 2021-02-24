const Task = require("../model/task.model");
const ObjectId = require("mongoose").Types.ObjectId;

class TaskController {
  constructor() {}
  create(req, res, next) {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    task
      .save()
      .then((newTask) => res.json(newTask))
      .catch(next);
  }

  getById(req, res, next) {
    const { id } = req.params;
    Task.findById(id)
      .exec()
      .then((task) => res.json(task))
      .catch(next);
  }

  update(req, res, next) {
    const {
      title,
      tags,
      comments,
      description,
      _id,
      coverURL,
      members,
      files,
    } = req.body;
    Task.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { title, tags, comments, description, coverURL, members, files }
    )
      .exec()
      .then((result) => res.json({ message: "successfully" }))
      .catch(next);
  }

  delete(req, res, next) {
    const { id } = req.params;
    Task.deleteOne({ _id: ObjectId(id) })
      .exec()
      .then((result) =>
        res.json({
          message: "successfully",
        })
      )
      .catch(next);
  }
}

module.exports = TaskController;
