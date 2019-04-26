// Configuring the database
const dbConfig = require('./DB');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./routes/post.routes')(app);
require('./routes/user.routes')(app);
mongoose.Promise = global.Promise;


mongoose.connect( `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@argmax-info-o3xdy.mongodb.net/test?retryWrites=true`, 
{ useNewUrlParser: true } ).then(() => {
    console.log("Successfully connected to the db.")
    console.log("Listening on port " + ""+dbConfig.port);
    app.listen(dbConfig.port); 
}).catch(err => 
    { console.log(err); }
    );