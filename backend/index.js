require("dotenv").config()
const express = require('express');

const cors=require('cors');

const router=require('./routes/router');

require('./db/connection');


const server = express()
server.use('/uploads', express.static('uploads'));
//PORT definition
PORT=3001 || process.env.PORT  //static || dynamically

server.use(cors())

server.use(express.json())

server.use(router)


//define port and run the server application
server.listen((PORT),()=>{
    console.log(`Server is running on port ${PORT}`);
})

//request resolving
server.get('/',(req,res)=>{
    console.log(req.file);
    res.send('Get Request');
})
