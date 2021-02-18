const express = require("express");
const router = express.Router();
router.use("/boards", require("./board.route"));
router.use("/users", require("./user.route"));
router.use("/lists", require("./list.route"));
module.exports = router;
