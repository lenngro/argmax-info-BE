const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String},
    userCanEdit: {type: Boolean}},
    {
        versionKey : false
    });
    module.exports = mongoose.model('User', UserSchema);