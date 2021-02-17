const router = require("express").Router();
const Controller = require("../controller").UserController;
const controller = new Controller();

router.get("/", controller.get);

router.get("/:id", (req, res) => {});

router.post("/create", controller.create);

router.post("/delete/:id", (req, res) => {});

router.post("/updte/:id", (req, res) => {});

module.exports = router;
