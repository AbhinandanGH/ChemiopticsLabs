

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:kP1WmBgdCSpEAZ7M@backenddb.otnsuqn.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB model (schema) for your data
const FormData = mongoose.model('FormData', {
    name: String,
      numberofsamples: Number,
      samples: [{ sampleId: String, labCode: String }],
      email: String,
      phone: String,
      address: {
        line1: String,
        line2: String,
        pincode: String,
        landmark: String,
      },
      sample: String,
      sampleDate: String,
      sampleTime: String,
      collectorName: String,
      collectedDate: String,
      collectedTime: String,
      examination: {
        suitable: Boolean,
        damage: Boolean,
        satisfactory: Boolean,
        labeling: Boolean,
        quantity: Boolean,
        preserved: Boolean,
        containerSuitable: Boolean,
        containerDamage: Boolean,
        dateAndTimeSatisfactory: Boolean,
        properLabeling: Boolean,
        quantitySuitable: Boolean,
        samplePreserved: Boolean,
      },
      Decision: String,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post('/api/submitForm', async (req, res) => {
  try {
    // Create a new instance of your model with the submitted data
    const formData = new FormData(req.body);

    // Save the data to MongoDB
    await formData.save();

    // Respond with a success message
    res.status(200).json({ message: 'Form data stored successfully!' });
  } catch (error) {
    console.error('Error storing form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
