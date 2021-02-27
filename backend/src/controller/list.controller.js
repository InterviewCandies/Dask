const List = require("../model/list.model");
const Task = require("../model/task.model");
const ObjectId = require("mongoose").Types.ObjectId;

class ListController {
  constructor() {}
  create(req, res, next) {
    const { title, tasks } = req.body;
    const list = new List({ title, tasks });
    list
      .save()
      .then((newList) => res.json(newList))
      .catch(next);
  }

  getListById(req, res, next) {
    const { id } = req.params;
    List.findById(id)
      .exec()
      .then((list) => res.json(list))
      .catch(next);
  }

  delete(req, res, next) {
    const { id } = req.params;
    List.deleteOne({ _id: ObjectId(id) })
      .exec()
      .then((result) => {
        res.json({
          message: "successfully",
        });
      })
      .catch(next);
  }

  update(req, res, next) {
    const { _id, tasks, title } = req.body;
    List.findOneAndUpdate({ _id: ObjectId(_id) }, { tasks, title })
      .exec()
      .then((result) => res.json({ message: "successfully" }))
      .catch(next);
  }
}
module.exports = ListController;
