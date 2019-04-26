const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    id: { type: String },
    date: { type: String },
    content: { type: String }},
    {
        versionKey : false
    });
    module.exports = mongoose.model('Post', PostSchema);