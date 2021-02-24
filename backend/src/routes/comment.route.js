const router = require("express").Router();
const Controller = require("../controller").CommentController;
const controller = new Controller();

router.get("/:id", controller.getById);
router.post("/create", controller.create);
router.post("/update", controller.update);
router.get("/delete/:id", controller.delete);

module.exports = router;
