var testAPIRouter = require("./api/routes/testAPI");
var express = require('express');
var cors = require("cors");
const logger = require("morgan");

app = express(),
port = process.env.PORT || 9000,
  
mongoose = require('mongoose'),
Client = require('./api/models/clientModel'),
Store = require('./api/models/clientModel'),
Device = require('./api/models/clientModel'),
bodyParser = require('body-parser');
  

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Clientdb', { useNewUrlParser: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/testAPI", testAPIRouter);
app.use(cors());
app.use(logger('dev'));


var routes = require('./api/routes/clientRoutes'); 
routes(app); 

app.listen(port);
console.log('client RESTful API server started on: ' + port);