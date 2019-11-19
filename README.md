Samlee Express
===
#### Database Systems term project

1.สร้าง table โดยการรัน createTable.sql ใน mySQL

2.ก๊อบโค้ดข้างล่าง แล้วเซฟไว้ชื่อ database.js เก็บไว้ที่ root folder ด้วย
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


4.npm install --save react-scripts

5.รันโดย
npm start ที่ samlee-frontend 
node server.js ที่ root