const Board = require("../model").Board;

class BoardController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const { title, visibility } = req.body;
    const board = new Board({ title, visibility });
    board
      .save()
      .then((newlyCreated) => res.status(200).json({ message: "Succesfully" }))
      .catch((error) => console.log(error));
  }

  get(req, res) {
    const { user } = req.query;
    Board.findOne({ owner: user }, (error, boards) => {
      if (error) {
        console.log(error);
      } else {
        res.json(boards);
      }
    });
  }
}

module.exports = BoardController;
