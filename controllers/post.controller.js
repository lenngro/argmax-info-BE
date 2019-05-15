const Post = require('../models/post.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }
    const post = new Post({
        title: req.body.content.title,
        description: req.body.content.description,
        content: req.body.content.content,
        url: req.body.content.url,
        date: new Date().getDate().toLocaleString(),
    });

    // Save Post in the database
    post.save()
    .then(data => {
        res.send("true");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Post.find()
    .then(posts => {
        res.send(posts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving posts."
        });
    });

};

// Find a single note with a postId
exports.findOne = (req, res) => {
    Post.findOne({'url': req.params.postId})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });            
        }
        res.send(post);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving post with id " + req.params.postId
        });
    });
};


// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Find note and update it with the request body
    Post.findByIdAndUpdate(req.params.postId, {
        title: req.body.content.title,
        description: req.body.content.description,
        url: req.body.content.url,
        content: req.body.content.content
    }, {new: true})
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });
        }
        res.send("true");
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.postId
            });                
        }
        return res.status(500).send({
            message: "Error updating post with id " + req.params.postId
        });
    });
};



// Delete a post with the specified postId in the request
exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.postId)
    .then(post => {
        if(!post) {
            return res.status(404).send({
                message: "Post not found with id " + req.params.PostId
            });
        }
        res.send({message: "Post deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found with id " + req.params.PostId
            });                
        }
        return res.status(500).send({
            message: "Could not delete post with id " + req.params.PostId
        });
    });
};
