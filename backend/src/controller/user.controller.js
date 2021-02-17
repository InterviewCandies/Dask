const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

class UserController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res, next) {
    const { email, photoURL } = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const { secret } = config;

    User.findOneAndUpdate(
      { email: email },
      { $setOnInsert: { email, photoURL } },
      options
    )
      .exec()
      .then((user) => {
        const token = jwt.sign({ user }, secret, { expiresIn: "7d" });
        res.json(token);
      })
      .catch(next);
  }

  get(req, res, next) {
    User.find({})
      .exec()
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  }
}

module.exports = UserController;
