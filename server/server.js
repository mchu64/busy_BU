require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose'); // Require Mongoose

// Import your Mongoose models
const Facility = require('./models/facility.js');
const Rating = require('./models/rating.js');

const app = express();
app.use(cors());

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

app.post('/api/ratings', (req, res) => {
  // Destructure the rating and facility_id from the request body
  const { rating, facility_id } = req.body;

  // Create a new rating with the rating and facility_id from the request
  const newRating = new Rating({
    rating: rating,
    facility_id: facility_id
  });

  // Save the new rating to the database
  newRating.save()
    .then(rating => res.status(201).json(rating))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET Route for retrieving upstairs weigh room average rating
app.get('/api/ratings/average/weight-room', async (req, res) => {
  try {
    const ratings = await Rating.find({ facility_id: '6599fa67d85aa7b7734fef3d' }); // weight room 1 (upstairs)
    const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / (ratings.length || 1);
    res.json({ average: average.toFixed(2) }); // Send the average as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching the average rating", error: error });
  }
});

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
