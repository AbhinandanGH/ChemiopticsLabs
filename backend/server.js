

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhi:abhi@cluster0.vsjvmoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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
      },
      Decision: String,
});

// Create another MongoDB model for samples
const Sample = mongoose.model('Sample', {
  sampleId: String,
  labCode: String,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post('/api/submitForm', async (req, res) => {
  try {
    const formData = req.body;
    
    // Extract samples from form data
    const { samples, ...formDataWithoutSamples } = formData;

    // Create a new instance of the FormData model with the submitted data (excluding samples)
    const formDataInstance = new FormData(formDataWithoutSamples);

    // Save the form data to MongoDB
    await formDataInstance.save();

    // Save samples separately
    if (samples && samples.length > 0) {
      await Sample.insertMany(samples); // Save all samples in one go
    }

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
