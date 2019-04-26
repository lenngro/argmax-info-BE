const User = require('../models/user.model.js');

// Find a single user with a username
exports.findOne = (req, res) => {
    User.findOne({username: String(req.params.username)})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with username " + req.params.username
            });            
        }
        if (user.username == req.body.username && user.password == req.body.password && user.userCanEdit == true) {
            res.send(user.userCanEdit);
        }
        else {
            return res.status(404).send({
                message: "User not found or is not allowed to edit " + req.params.username
            }); 
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with username " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + req.params.username
        });
    });
};
