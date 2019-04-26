module.exports = (app) => {

    const users = require('../controllers/user.controller.js');

    // Retrieve a single User with username
    app.post('/users/:username', users.findOne);

}