//import mongoose
const mongoose = require('mongoose');
require('dotenv')
//create a connection string to connect db
const connectionString=process.env.DATABASE
mongoose.connect(process.env.DATABASE)
//connect
mongoose.connect(process.env.DATABASE,{
    // useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log(`Database Connected`);
}).catch((error)=>{
    console.log(error);
})