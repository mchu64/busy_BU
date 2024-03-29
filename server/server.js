require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose'); // Require Mongoose
const cron = require('node-cron');
// Import your Mongoose models
const Facility = require('./models/facility.js');
const Rating = require('./models/rating.js');

const app = express();
const corsOptions =
{
  origin: 'https://bu-busy.web.app',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));



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

const calculateAveragerating = async (facilityId, res) =>
{
  try {
    const ratings = await Rating.find({ facility_id: facilityId }); // weight room 1 (upstairs)
    const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / (ratings.length || 1);
    res.json({ average: average.toFixed(2) }); // Send the average as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching the average rating", error: error });
  }
};

let lastResetTime = new Date();

async function updateAndResetAverageRating () {
  console.log('Updating average ratings...');
  // Example: Calculate averages for a specific facility. Repeat for each facility as needed.
  const facilityId = '6599fa67d85aa7b7734fef3d'; // Example facility ID
  const thirtyMinutesAgo = new Date(new Date() - 30 * 60000);

  try {
    const ratings = await Rating.find({
      facility_id: facilityId,
      createdAt: { $gte: thirtyMinutesAgo }
    });

    if (ratings.length > 0) {
      const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length;
      console.log(`New average for facility ${facilityId}: ${average.toFixed(2)}`);
      // Here, you could also update the facility document or a separate averages document in your database
    } else {
      console.log(`No new ratings for facility ${facilityId} in the last 30 minutes.`);
    }
  } catch (error) {
    console.error('Error updating average ratings:', error);
  }
};



// GET Route for retrieving upstairs weigh room average rating
app.get('/api/ratings/average/weight-room1', async (req, res) => {
  
  try {
    const ratings = await Rating.find({ facility_id: '6599fa67d85aa7b7734fef3d' }); // weight room 1 (upstairs)
    const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / (ratings.length || 1);
    res.json({ average: average.toFixed(2) }); // Send the average as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching the average rating", error: error });
  }
});

// GET Route for retrieving lower weigh room average rating
app.get('/api/ratings/average/weight-room2', async (req, res) => {
  try {
    const ratings = await Rating.find({ facility_id: '6599fa7dd85aa7b7734fef3f' }); // weight room 1 (upstairs)
    const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / (ratings.length || 1);
    res.json({ average: average.toFixed(2) });
    // Send the average as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching the average rating", error: error });
  }
});

// GET Route for retrieving lower weigh room average rating
app.get('/api/ratings/average/upper-courts', async (req, res) => {
  try {
    const ratings = await Rating.find({ facility_id: '659a0affc0d15d547c126925' }); // weight room 1 (upstairs)
    const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / (ratings.length || 1);
    res.json({ average: average.toFixed(2) });

     // Send the average as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching the average rating", error: error });
  }
});

// GET Route for retrieving lower weigh room average rating
app.get('/api/ratings/average/lower-courts', async (req, res) => {
  try {

    const ratings = await Rating.find({ facility_id: '659b382f10a04f1ccc8f2e6b' }); // weight room 1 (upstairs)
    const average = ratings.reduce((acc, { rating }) => acc + rating, 0) / (ratings.length || 1);
    res.json({ average: average.toFixed(2) });

     // Send the average as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching the average rating", error: error });
  }
});


cron.schedule('* * * * *', async () => {

  console.log('Cron job is running!');
  await updateAndResetAverageRating('6599fa67d85aa7b7734fef3d', res); // Facility ID for weight room 1 (upstairs)
  await updateAndResetAverageRating('6599fa7dd85aa7b7734fef3f', res); // Facility ID for weight room 2 (downstairs)
  await updateAndResetAverageRating('659a0affc0d15d547c126925', res); // Facility ID for upper courts
  await updateAndResetAverageRating('659b382f10a04f1ccc8f2e6b', res); // Facility ID for lower courts
}, {
  scheduled: true,
  timezone: "America/New_York", // Adjust the timezone as needed
});

// Start the server after setting up MongoDB and routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Properly close the Mongoose connection when the app stops

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  
});