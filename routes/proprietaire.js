const express = require("express");

const router = express.Router();

const proprietaireCtrl = require("../controllers/proprietaire");

const verifEmail = require("../midlewares/validEmail");

const verifpwd = require("../midlewares/validPwd");

const stopLimit = require("../midlewares/limitLoginRequest");

router.post("/signup",verifEmail, verifpwd, proprietaireCtrl.singUp);

router.post("/login",stopLimit, proprietaireCtrl.login);

module.exports = router;