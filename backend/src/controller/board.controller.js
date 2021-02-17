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

  get(req, res) {
    const { user } = req.query;
    Board.find({ owner: user }, (error, boards) => {
      if (error) {
        console.log(error);
      } else {
        res.json(boards);
      }
    });
  }

  update(req, res) {
    const {
      title,
      visibility,
      coverURL,
      owner,
      members,
      lists,
      _id,
    } = req.body;
    Board.findOneAndUpdate(
      { _id: ObjectId(_id) },
      { title, visibility, coverURL, members, owner, lists },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          res.json({ message: "successfully" });
        }
      }
    );
  }
}

module.exports = BoardController;
