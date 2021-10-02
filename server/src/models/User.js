const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const UserSchema = new mongoose.Schema({
    name: String,
    language : String
    
});

const User= mongoose.model('user',UserSchema);
module.exports = User;