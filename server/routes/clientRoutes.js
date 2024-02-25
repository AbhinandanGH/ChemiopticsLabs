// routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const Client = require('../models/clientModel');

// Route to add a new client
router.post('/clients', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;