var express = require('express')
var router = express.Router()
 

router.get('/', function (req, res) {
    res.send('อะกิตะ')
})
 
module.exports = router  // ส่ง router ที่เราสร้าง ออกไปใช้งานภายนอกไฟล์