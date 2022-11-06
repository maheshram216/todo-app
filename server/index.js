const express = require("express");
const mongooes = require("mongoose");
const router = require('./Auth.js/login');
const todoList = require("./Auth.js/todos")
const bodyParser = require("body-parser");
const secret = "secret"
var jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use('/todo',(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split("test ")[1];
        jwt.verify(token, secret, function(err, decoded) {
            if(err){
                return res.status(400).json({
                    status:"failed",
                    meassage: err.message
                });
            }
            req.user = decoded.data
            // console.log(decoded.data);
            next();
          });
    }else{
        return res.status(400).json({
            status:"failed",
            meassage: "not authenticated"
        });

    }
})

const PORT = 5000

mongooes.connect('mongodb://localhost/todos')
.then(()=>console.log('db connected'))
.catch((err)=>console.log('no connection'))

app.use('/todo',todoList);
app.use('/user', router);

app.listen(PORT,()=>{console.log(`server connected to port ${PORT}`)});