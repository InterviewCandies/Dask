const router = require("express").Router();
const Controller = require("../controller").TaskController;
const controller = new Controller();

router.get("/:id", (req, res) => {});
router.post("/create", controller.create);
router.get("/delete/:id", controller.delete);
router.post("/update", controller.update);

module.exports = router;
