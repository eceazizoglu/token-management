'use strict';

var mongoose = require('mongoose'),

  Client = mongoose.model('Clients'),
  Store = mongoose.model('Stores'),
  Device = mongoose.model('Devices');

exports.read_the_clients = function(req, res) {   //works
  Client.find({}, function(err, client) {
    if (err)
      res.send(err);
    res.json(client);
  });
};

exports.create_a_client = function(req, res) {  //works
  console.log("Request received", req.body)
  var new_client = new Client();
  new_client.client = req.body;
  new_client.save(function(err, client) {
    if (err)
      res.send(err);
    res.send(req.body);
    
  });
};

exports.delete_all_clients = function(req, res) {   //works
  Client.remove({
    userID: req.params.userID
  }, function(err, client) {
    if (err)
      res.send(err);
    res.json({ message: 'Client successfully deleted' });
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

exports.create_a_store = function(req, res) {  
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

exports.read_the_stores = function(req, res) {
  //var query =  {'store.userID': req.params.storeID}
  //console.log(query)
  Store.find( {}, function(err, store) {
    if(err)
      res.send(err);
    res.json(store)
  });
};

exports.update_a_store = function(req, res) {
  Store.findOneAndUpdate({storeID: req.params.storeID}, req.body, {new: true}, function(err, store) {
    if (err)
      res.send(err);
    res.json(store);
  });
};

exports.delete_a_store = function(req, res) {
  Store.remove({
    storeID: req.params.storeID
  }, function(err, store) {
    if (err)
      res.send(err);
    res.json({ message: 'Store successfully deleted' });
  });
};

exports.read_the_devices = function(req, res) {
  Device.findById(req.params.deviceID, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};

exports.put_a_device = function(req, res) {
  Device.findOneAndUpdate({deviceID: req.params.deviceID}, req.body, {new: true}, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
    store.devices.push(device)
  });
};

exports.delete_a_device = function(req, res) {
  Device.remove({
    deviceID: req.params.deviceID
  }, function(err, device) {
    if (err)
      res.send(err);
    store.devices.remove(device)
    res.json({ message: 'Device successfully deleted' });
  });
};