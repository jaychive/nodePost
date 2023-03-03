const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8003;

const event2 = require('./api/event2');

app.use(express.static(path.join(__dirname,'public')))

app.use('/event2', event2);

app.get('/', (req, res)=>{
res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.use((req, res)=>{
  res.status(404).sendFile(path.join(__dirname,'public/nopage.html'))
})

app.listen(PORT, ()=>{
  console.log('okay')
})