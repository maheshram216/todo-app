const mongooes = require("mongoose");

const todoSchema = new mongooes.Schema({
    Running: {type: String},
    Drinking: {type: String},
    Sleeping: {type: String},
    Cooking: {type: String},
    Eating: {type: String},
    Washing: {type:String},
    user:{
        type: mongooes.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Usermodel = mongooes.model('TodoList', todoSchema);

module.exports = Usermodel