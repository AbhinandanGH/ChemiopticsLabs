// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhi:abhi@cluster0.vsjvmoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB model (schema) for the form data
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

// Create a MongoDB model (schema) for sample information
const SampleInfoSchema = new mongoose.Schema({
  sampleId: String,
  labCode: String
});

// Create a MongoDB collection for sample information
const SamplesInfo = mongoose.model('SamplesInfo', SampleInfoSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post('/api/submitForm', async (req, res) => {
  try {
    const formData = req.body;
    
    // Create a new instance of the FormData model with the submitted data
    const formDataInstance = new FormData(formData);

    // Save the form data to MongoDB
    await formDataInstance.save();

    // Iterate through formData.samples array to save each sample's information to SamplesInfo collection
    for (const sample of formData.samples) {
      const sampleInfoInstance = new SamplesInfo({
        sampleId: sample.sampleId,
        labCode: sample.labCode
      });
      await sampleInfoInstance.save();
    }

    // Respond with a success message
    res.status(200).json({ message: 'Form data and sample information stored successfully!' });
  } catch (error) {
    console.error('Error storing form data and sample information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch the name from MongoDB
app.get('/api/getName', async (req, res) => {
  try {
    // Find the most recently stored document by sorting in descending order based on a timestamp field
    const formData = await FormData.findOne().sort({ _id: -1 });

    if (!formData) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Extract the name from the most recent document
    const name = formData.name;

    res.json({ name });
  } catch (error) {
    console.error('Error fetching name from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/getRecentSampleInfo', async (req, res) => {
  try {
    // Find the most recently stored document by sorting in descending order based on a timestamp field
    const sampleInfo = await SamplesInfo.findOne().sort({ _id: -1 });

    if (!sampleInfo) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Extract the sample info
    const recentSampleInfo = {
      sampleId: sampleInfo.sampleId,
      labCode: sampleInfo.labCode
    };

    res.json(recentSampleInfo);
  } catch (error) {
    console.error('Error fetching recent sample info from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
