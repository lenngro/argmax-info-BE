const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    content: { type: String },
    url: { type: String},
    date: { type: String }},
    {
        versionKey : false
    },
    );
    module.exports = mongoose.model('Post', PostSchema);