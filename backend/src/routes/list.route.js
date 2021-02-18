const router = require("express").Router();
const Controller = require("../controller").ListController;
const controller = new Controller();
router.post("/create", controller.create);
router.post("/update", controller.update);
router.get("/delete/:id", controller.delete);
router.get("/:id", controller.getListById);

module.exports = router;
