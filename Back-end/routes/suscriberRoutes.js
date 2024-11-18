const express = require("express");
const { addSuscriber, getSuscriber, findEmails } = require("../controllers/suscriberController");
const router = express.Router();

router.route("/").post(addSuscriber).get(getSuscriber)


module.exports=router;
