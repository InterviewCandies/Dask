const express = require("express");
const router = express.Router();
const Controller = require("../controller").BoardController;
const controller = new Controller();
router.post("/create", controller.create);
router.get("/", controller.get);
router.post("/update", controller.update);
module.exports = router;
