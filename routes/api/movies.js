const express = require("express");

const ctrl = require("../../controllers/movies");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.post("/add", authenticate, ctrl.add);

router.delete("/", authenticate, ctrl.remove);

module.exports = router;
