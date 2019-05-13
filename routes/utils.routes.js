module.exports = (app) => {

    const utils = require('../controllers/utils.controller.js');

    // Retrieve all Notes
    app.get('/posts/list', posts.findAll);

}