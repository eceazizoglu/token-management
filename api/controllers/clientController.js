'use strict';

var mongoose = require('mongoose');
var emailCheck = require('email-check'),

  Client = mongoose.model('Clients'),
  Store = mongoose.model('Stores'),
  Device = mongoose.model('Devices');

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

global.IDarr = [];

function checkElement(e) {        
     for(var i = 0 ; i< IDarr.length; i++) {        
           if(IDarr[i] == e) {
             return true;
         }
     }
     return false;
 }


 exports.check_client = function(req, res) {
  var query =  {'client.email': req.body.email}
  console.log(query)
  console.log(req.body)

  Client.findOne(query, function(err, client) {
    if(err)
      res.send(err);
      if(client!=null) {
        if(req.body.password == client.client.password) {
          var message = {
            "status": 200,
            "message": "log in successful",
            "userID" : client.client.userID
          }
          res.json(message)

        }
        else {
          var message = {
            "status": 400,
            "message": "password is wrong"
            
          }
          res.status(400);
          res.json(message)

        }
      }
    else {
      var message = {
        "status": 404,
        "message": "log in unsuccessful"
        
      }
      res.status(404);
      res.json(message)
    }

  });
};

//CLIENT
exports.read_the_clients = function(req, res) {   //works
  Client.find({}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};


exports.create_a_client = function(req, res) {  //works
  console.log("Request received", req.body)
  var email = req.body.email
  var userID =  req.body.userID
  if(validateEmail(email)) {
    if(checkElement(userID)) {
      res.json({ message: 'there is already a user with id ' + userID });
    }
    else
      IDarr.push(userID)
      console.log(IDarr)
      var new_client = new Client();
      new_client.client = req.body;
      var email = req.body.email
      new_client.save(function(err, client) {
        if (err)
          res.send(err);
        res.send(req.body);
      });
  }
  else
    res.json({ message: req.body.email + ' is not a valid email address' });
};

exports.delete_all_clients = function(req, res) {   //works
  Client.remove({
    userID: req.params.userID
  }, function(err, client) {
    if (err)
      res.send(err);
    res.json({ message: 'Clients successfully deleted' });
  });
};

exports.read_a_client = function(req, res) {    //works
  var query =  {'client.userID': req.params.userID}
  console.log(query)
  Client.find(query, function(err, client) {
    if(err)
      res.send(err);
    res.json(client)
  });
};

exports.delete_a_client = function(req, res) {    //works
  var query =  {'client.userID': req.params.userID}
  Client.remove(query, function(err, client) {
    if (err)
      res.send(err);
    res.json({ message: 'Client successfully deleted' });
  });
};

exports.read_the_stores = function(req, res) {  //works
  Store.find( {}, function(err, store) {
    if(err)
      res.send(err);
    res.json(store)
  });
};

exports.read_the_stores_by_userID  = function(req, res) {  
  var query =  {'store.userID': req.params.userID}
  Store.find(query, function(err, store) {
    if(err)
      res.send(err);
    res.json(store)
  });
};

//STORE
exports.create_a_store = function(req, res) {  //works
  console.log("Request received", req.body)
  var new_store = new Store();
  new_store.store = req.body;
  new_store.save(function(err, store) {
    if (err)
      res.send(err);
    //res.json({ message: 'Store successfully created' });
    req.body.message = 'Store successfully created'
    res.send(req.body);
  });
};


exports.update_a_store = function(req, res) {
  Store.findOneAndUpdate({'store.storeID': req.params.storeID}, { store: req.body}, {upsert: true}, function(err, store) {
    if (err)
      res.send(err);
    res.json(store);
  });
};

exports.delete_all_stores = function(req, res) {
  Store.remove({
    storeID: req.params.storeID
  }, function(err, store) {
    if (err)
      res.send(err);
    res.json({ message: 'Stores successfully deleted' });
  });
};

exports.read_a_store = function(req, res) {    
  var query =  {'store.storeID': req.params.storeID}
  console.log(query)
  Store.find(query, function(err, store) {
    if(err)
      res.send(err);
    res.json(store)
  });
};

exports.delete_a_store = function(req, res) {    
  var query =  {'store.storeID': req.params.storeID}
  Store.remove(query, function(err, store) {
    if (err)
      res.send(err);
    res.json({ message: 'Store successfully deleted' });
  });
};

//DEVICE
exports.read_the_devices = function(req, res) {
  Device.find({}, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};

exports.read_the_devices_by_storeID  = function(req, res) { 
  console.log(" test", req.params.storeID) 
  var query =  {'device.storeID': req.params.storeID}
  Device.find(query, function(err, device) {
    if(err)
      res.send(err);
    console.log(device)
    res.json(device)
  });
};

exports.create_a_device = function(req, res) {
  console.log("Request received", req.body)
  var new_device = new Device();
  new_device.device = req.body;
  new_device.save(function(err, device) {
    if (err)
      res.send(err);
    req.body.message = 'Device successfully created'
    res.send(req.body);
  });
};

exports.update_a_device = function(req, res) {
  Device.findOneAndUpdate({_id: req.body.deviceID}, req.body, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
   // device.devices.push(device)
  });
};

exports.delete_all_devices = function(req, res) {
  Device.remove({
    deviceID: req.params.deviceID
  }, function(err, device) {
    if (err)
      res.send(err);
    device.devices.remove(device)
    res.json({ message: 'Devices successfully deleted' });
  });
};

exports.read_a_device = function(req, res) {    
  var query =  {'device.deviceID': req.params.deviceID}
  console.log(query)
  Device.find({query}, function(err, device) {
    if(err)
      res.send(err);
    res.json(device)
  });
};

exports.delete_a_device = function(req, res) {   
  var query =  {'device.deviceID': req.params.deviceID}
  Device.remove(query, function(err, device) {
    if (err)
      res.send(err);
    res.json({ message: 'Device successfully deleted' });
  });
};

exports.delete_all_devices_in_the_store = function(req, res) {   
  var query =  {'device.storeID': req.params.deviceID}
  Device.remove(query, function(err, device) {
    if (err)
      res.send(err);
    res.json({ message: 'Devices successfully deleted' });
  });
};



