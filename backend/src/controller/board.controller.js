const Board = require("../model").Board;

class BoardController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const { title, visibility, coverURL, owner } = req.body;
    const board = new Board({
      title,
      visibility,
      coverURL,
      owner,
    });
    board
      .save()
      .then((newlyCreated) => res.status(200).json(newlyCreated))
      .catch((error) => console.log(error));
  }

  get(req, res) {
    const { user } = req.query;
    console.log(user);
    Board.find({ owner: user }, (error, boards) => {
      if (error) {
        console.log(error);
      } else {
        res.json(boards);
      }
    });
  }
}

module.exports = BoardController;
