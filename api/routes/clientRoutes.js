'use strict'
module.exports = function(app) {
var client = require('../controllers/clientController');

    app.route('/clients')
        .get(client.read_the_clients)
        .post(client.create_a_client)
        .delete(client.delete_all_clients)

    app.route('/clients/:userID') 
        .get(client.read_a_client) //
        .delete(client.delete_a_client) //
       // .put(client.update_a_client) //

    app.route('/stores')
        .get(client.read_the_stores)
        .post(client.create_a_store)
        .put(client.update_a_store) 
        .delete(client.delete_a_store)

    app.route('/devices')
        .get(client.read_the_devices)
        .put(client.put_a_device)
        .delete(client.delete_a_device)

};