const Post = require('../models/post.model.js');

exports.findAll = (req, res) => {

    // db.inventory.find( { status: "A" }, { item: 1, status: 1 } )

    Post.findAll({}, { title: 1, description: 1, url: 1 })
        .then(postList => {
            res.send(postList);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the post list."
            })
        });
};