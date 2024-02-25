// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const uri = 'mongodb+srv://Abhi:Abhi@cluster0.fk8nbuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // This option is often included as well
    createIndexes: true // Use createIndexes instead of useCreateIndex
});

const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', clientRoutes);




// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});