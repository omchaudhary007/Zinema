const express = require("express");
const { login, signUp } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);
router.post("/signUp", signUp);

module.exports = router;
