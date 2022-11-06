const express = require("express");
const TodoSchema = require("../Models/TodoSchema");

const routes = express.Router();

routes.get('/list',async (req,res)=>{
    try {
        const todoData = await TodoSchema.find({ user:req.user }).populate(
          "username",
          "password"
        );
        return res.status(200).json({
          todos: todoData,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 'error',
          error: error.message
        });
      }
    
    }
    );

    routes.post('/create',async (req,res)=>{
        try {
            const todoData = await TodoSchema.create({ user:req.user })
            return res.status(200).json({
              todos: todoData,
            });
          } catch (error) {
            console.log(error);
            return res.status(500).json({
              status: 'error',
              error: error.message
            });
          }
        
        }
        );

module.exports = routes