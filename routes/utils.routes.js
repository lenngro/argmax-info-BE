module.exports = (app) => {

    const utils = require('../controllers/utils.controller.js');
    app.get('/utils/list', utils.findAll);

}