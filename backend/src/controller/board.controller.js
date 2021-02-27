const Board = require("../model").Board;
const ObjectId = require("mongoose").Types.ObjectId;

class BoardController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const { title, visibility, coverURL, owner, members } = req.body;
    const board = new Board({
      title,
      visibility,
      coverURL,
      owner,
      members: [...members],
    });
    board
      .save()
      .then((newlyCreated) => res.status(200).json(newlyCreated))
      .catch((error) => console.log(error));
  }

  get(req, res, next) {
    const { user } = req.query;
    Board.find({
      $or: [{ owner: user }, { visibility: false }],
    })
      .exec()
      .then((boards) => res.json(boards))
      .catch(next);
  }

  delete(req, res, next) {
    const { id } = req.params;
    Board.findByIdAndDelete(id)
      .exec()
      .then(() => res.json({ message: "succecssfullly" }))
      .catch(next);
  }

  update(req, res, next) {
    const {
      title,
      visibility,
      coverURL,
      owner,
      members,
      _id,
      description,
      lists,
    } = req.body;
    Board.findOneAndUpdate(
      { _id: ObjectId(_id) },
      {
        title,
        visibility,
        coverURL,
        members,
        owner,
        lists: [...lists],
        description,
      }
    )
      .exec()
      .then(() => res.json({ message: "successfully" }))
      .catch(next);
  }
}

module.exports = BoardController;
