const express = require("express");
const router = express.Router();


router.use("/customer", require("./customer"));
router.use("/parcel", require("./parcel"));

module.exports = router;