const express = require("express");
const router = express.Router();


router.use("/customer", require("./customer"));
router.use("/parcel", require("./parcel"));
router.use("/shipmentStatus", require("./shipmentStatus"));

module.exports = router;