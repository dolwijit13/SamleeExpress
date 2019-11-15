const express = require("express");
const router = express.Router();


router.use("/shiba", require("./shiba"));
router.use("/akita", require("./akita"));

module.exports = router;