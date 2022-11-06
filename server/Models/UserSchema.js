const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
    username: {type: String},
    password: {type: String}
});

const Usermodel = mongooes.model('User', userSchema);

module.exports = Usermodel