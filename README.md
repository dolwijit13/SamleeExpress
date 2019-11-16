Samlee Express
===
####Database Systems term project

ก๊อบโค้ดข้างล่าง แล้วเซฟไว้ชื่อ database.js ด้วย
อย่าลืมใส่ password ด้วยนะ
```
const mysql = require('mysql');
module.exports = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'SamleeExpress'
});
```