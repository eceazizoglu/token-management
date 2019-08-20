'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    client: {
        firstName: String,
        lastName: String,
        email: String,
        userID: Number
    },

    Created_date: {
        type: Date,
        default: Date.now
    }
    
});

var StoreSchema = new Schema({

    store: {
        storeID: Number,
        address: String,
        devices: Array,
        userID: Number
    },

});

var DeviceSchema = new Schema({

    device: {
        deviceID: Number,
        storeID: Number
    },

});

module.exports = mongoose.model('Clients', ClientSchema)
module.exports = mongoose.model('Stores', StoreSchema)
module.exports = mongoose.model('Devices', DeviceSchema)