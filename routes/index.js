const express = require("express");
const router = express.Router();


router.use("/shiba", require("./shiba"));
router.use("/akita", require("./akita"));
router.use("/customer", require("./addCustomer"));

module.exports = router;