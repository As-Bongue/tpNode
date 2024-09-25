const express = require("express");

const router = express.Router();

const multer = require("../midlewares/multer-config");

const immoCtrl = require("../controllers/immobilier");

const authentication = require("../midlewares/verifyLogin");

router.get("", authentication, immoCtrl.getAll);

router.get("/:id", authentication, immoCtrl.getOne);

router.post("", authentication, multer, immoCtrl.createOne);

router.put("/:id", authentication, multer, immoCtrl.updateOne);

router.delete("/:id", authentication, immoCtrl.delateOne);

module.exports = router;