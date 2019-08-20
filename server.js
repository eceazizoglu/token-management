var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
  
mongoose = require('mongoose'),
Client = require('./api/models/clientModel'),
Store = require('./api/models/clientModel'),
Device = require('./api/models/clientModel'),
bodyParser = require('body-parser');
  

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Clientdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/clientRoutes'); 
routes(app); 

app.listen(port);
console.log('client RESTful API server started on: ' + port);