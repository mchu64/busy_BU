require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Require Mongoose

// Import your Mongoose models
const Facility = require('./models/facility.js');
const Rating = require('./models/rating.js');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection setup with Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB Atlas via Mongoose");
});

// Example of a route
app.get('/', (req, res) => {
  res.send('Gym Occupancy Tracker Home');
});

// POST Route for creating new facility in the facilities collection
app.post('/api/facilities', (req, res) => {
  const newFacility = new Facility({
    facility_name: req.body.facility_name,
  });

  newFacility.save()
    .then(facility => res.status(201).json(facility))
    .catch(err => res.status(400).json('Error: ' + err));
});

// More routes can be added here

// Start the server after setting up MongoDB and routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Properly close the Mongoose connection when the app stops
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit();
});
