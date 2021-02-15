const User = require("../model/user.model");

class UserController {
  constructor() {
    this.create = this.create.bind(this);
  }

  create(req, res) {
    const { email, photoURL } = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    User.findOneAndUpdate(
      { email: email },
      { email, photoURL },
      options,
      function (error, user) {
        if (error) {
          console.log(error);
        } else res.json(user);
      }
    );
  }
}

module.exports = UserController;
