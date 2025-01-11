const express = require('express');
const cors = require('cors');
const chalk= require('chalk')
const db=require('./db')
require('dotenv').config('./.env');
const {requestInfo}=require('./middlewares')



//middleware
const app = express();
app.use(cors({credentials:true}));
app.use(express.json());
app.use(express.static('public'));
app.use(requestInfo)

//routes
const routes = require('./routes')
app.use('/api',routes)

app.use('*',(req,res)=>{
    console.log(chalk.red('404 Not Found Error'))
    return res.status(404).json({error:true,message:"No route found"})
})


app.listen(8000, () => {
  console.log(chalk.blue('App is running @ http://localhost:8000/'));
});
