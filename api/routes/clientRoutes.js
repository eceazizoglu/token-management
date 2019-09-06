'use strict'
module.exports = function(app) {
var client = require('../controllers/clientController');

    app.route('/clients')
        .get(client.read_the_clients)
        .post(client.create_a_client)
        .delete(client.delete_all_clients)

    app.route('/clients/:userID') 
        .get(client.read_a_client) 
        .delete(client.delete_a_client) 

    app.route('/login')
    .post(client.check_client)

    app.route('/stores')
        .get(client.read_the_stores)
        .post(client.create_a_store)
        .delete(client.delete_all_stores)

    app.route('/stores/:userID')
        .get(client.read_the_stores_by_userID)

   app.route('/stores/:storeID') 
       .get(client.read_a_store) 
       .put(client.update_a_store) 
       .delete(client.delete_a_store) 

    app.route('/devices')
        .get(client.read_the_devices)
        .post(client.create_a_device)
        .put(client.update_a_device)
        .delete(client.delete_all_devices)

    app.route('/devices/:storeID')
        .get(client.read_the_devices_by_storeID)
        .delete(client.delete_all_devices_in_the_store)

    app.route('/device/:deviceID') 
        .get(client.read_a_device) 
        .delete(client.delete_a_device) 


};