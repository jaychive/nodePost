const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:true}))

router.get('/',(req, res, next)=>{
  try{
    const dbcon = require('../db/dbconnect');
    router.use('/', dbcon);
    next('route');  
  }
  catch(err){
    console.log(err);
  }
})

router.post('/', (req, res, next)=>{
  try{
    const dbcon = require('../db/dbconnect');
    router.use('/', dbcon);
    next('route');  
  }
  catch(err){
    console.log(err);
  }
})

module.exports = router;