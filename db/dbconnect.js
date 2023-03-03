const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

// require("dotenv").config({path: path.join(__dirname, '.env')});

// const dbconfig = {
//   host: process.env.HOST,
//   port: process.env.PORT,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   connectionLimit: 4
// }

const dbconfig = {
  host: "",
  port: "",
  user: "",
  password: "",
  database: "",
  connectionLimit: 4
}

const pool = mysql.createPool(dbconfig) // DB 연결

router.use(bodyParser.json());

router.get('/', (req, res) => {

  const modalQuery = `select name from jay_bring ORDER BY no DESC LIMIT 1`;

  pool.getConnection((err, connection) => {
    if (err) throw console.log(" 이 에러가 보인다면 dB정보 틀린거임  : " + err);

    connection.query(modalQuery, (error, result) => {
      if (error) throw "여기 에러는 sql문 오류" + error + result;
      res.send(result);
    })
    connection.release();

  })
})

router.post('/', (req, res, next) => {

  let reqbody = req.body //미들웨어 실행되어야 가능, 리액트 json 받아옴

  if (!reqbody || !reqbody.body) {
    return
  } else {
    let param = JSON.parse(reqbody.body);

    let ordernum = param.ordernum;
    let oliveid = param.oliveid;
    let name = param.name;
    let email = param.email;

    const formQuery = `insert into jay_bring (no, ordernum, oliveid, name, email)
    values (null, '${ordernum}', '${oliveid}', '${name}', '${email}')`;

    // res.send(formQuery);

    pool.getConnection((err, connection) => {
      if (err) throw console.log(" 이 에러가 보인다면 dB정보 틀린거임  : " + err);

      connection.query(formQuery, (error, result) => {
        if (error) throw "여기 에러는 sql문 오류" + error + result;
        res.send('성공');
      })
      connection.release();

    })

  }

})


module.exports = router;