Samlee Express
===
#### Database Systems term project

1.สร้าง table โดยการรัน createTable.sql ใน mySQL

2.ก๊อบโค้ดข้างล่าง แล้วเซฟไว้ชื่อ database.js ด้วย
อย่าลืมใส่ password ด้วยนะ
 .gitignore เอาไว้แล้ว ไม่ต้องกลัว push password ขึ้นมา
```
const mysql = require('mysql');
module.exports = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'SamleeExpress'
});
```

3.ลงๆ ตามลิงค์นี้
https://monkeywebstudio.com/nodejs-express-js-curd-mysql-part-1/

4.ตอนนี้ยังไม่ได้เชื่อมกับ front เลยใช้ pug ไปก่อน
ไม่รู้ว่าแค่รันต้องลงอะไรเพิ่มมั้ย แต่ถ้าเออเร่อก็ลองทำๆตามลิงค์นี้
https://monkeywebstudio.com/nodejs-express-js-curd-mysql-part-2/