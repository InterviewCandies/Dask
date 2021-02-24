const Comment = require("../model/comment.model");
const ObjectId = require("mongoose").Types.ObjectId;

class CommentController {
  constructor() {}

  getById(req, res, next) {
    const { id } = req.params;
    Comment.findById(id)
      .exec()
      .then((comment) => res.json(comment))
      .catch(next);
  }

  create(req, res, next) {
    const { content, author } = req.body;
    const comment = new Comment({ content, author });
    comment
      .save()
      .then((newComment) => res.json(newComment))
      .catch(next);
  }

  update(req, res, next) {
    const { content, author, _id } = req.body;
    Comment.findOneAndUpdate({ _id: ObjectId(_id) }, { content, author })
      .exec()
      .then((result) => res.json({ message: "successfully" }))
      .catch(next);
  }

  delete(req, res, next) {
    const { id } = req.params;
    Comment.findByIdAndDelete(id)
      .exec()
      .then((result) => res.json({ message: "successfully" }))
      .catch(next);
  }
}

module.exports = CommentController;
