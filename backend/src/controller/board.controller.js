const Board = require("../model").Board;

class BoardController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const board = new Board(req.body);
    board
      .save()
      .then((newlyCreated) => res.status(200).json({ message: "Succesfully" }))
      .catch((error) => console.log(error));
  }

  get(req, res) {
    Board.find((error, boards) => {
      if (error) {
        console.log(error);
      } else {
        res.json(boards);
      }
    });
  }
}

module.exports = BoardController;
