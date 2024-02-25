// models/clientModel.js

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: String,
    numberofsamples: Number,
    sampleId: String,
    labCode: String,
    email: String,
    phone: String,
    address: String,
    sample: String,
    sampleDate: Date,
    sampleTime: String,
    collectorName: String,
    examination: {
        suitable: Boolean,
        damage: Boolean,
        satisfactory: Boolean,
        labeling: Boolean,
        quantity: Boolean,
        preserved: Boolean
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;