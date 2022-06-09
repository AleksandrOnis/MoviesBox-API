const express = require("express");

const ctrl = require("../../controllers/users");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/current", authenticate, ctrl.current);

router.get("/logout", authenticate, ctrl.logout);

module.exports = router;
