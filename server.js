// Configuring the database
const dbConfig = require('./DB');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors')

const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    res.json({"message": "Welcome to argmax.info's backend."});
});
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit: "100mb", extended: true, parameterLimit:50000}));

// link to defined routes
require('./routes/post.routes')(app);
require('./routes/user.routes')(app);
mongoose.Promise = global.Promise;

mongoose.connect( dbConfig.url, 
{ useNewUrlParser: true } ).then(() => {
    console.log("Successfully connected to the db.")
}).catch(err => 
    { console.log(err); }
    );

http.createServer(app).listen(process.env.PORT || 8000)
