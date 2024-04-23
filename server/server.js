require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose'); 
const cron = require('node-cron');
const Facility = require('./models/facility.js');
const Rating = require('./models/rating.js');
const getWeather = require('./weather.js');

const app = express();
const corsOptions = {
  origin: ['https://bu-busy.web.app', 'http://localhost:8080'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection setup with Mongoose
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB Atlas via Mongoose");
});

app.get('/', (req, res) => {
  res.send('Gym Occupancy Tracker Home');
});

app.get('/weather', async (req, res) => {
  try {
    const weatherData = await getWeather();
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Error fetching weather data" });
  }
});


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

const updateAndResetAverageRating = async (facilityId) => {
  console.log(`updateAndResetAverageRating called for facilityId: ${facilityId}`);
  try {
    const currentDate = new Date();
    console.log(`Current Date: ${currentDate}`);

    // Determine the current half-hour interval
    const currentMinutes = currentDate.getMinutes();
    const isPastHalfHour = currentMinutes >= 30;
    const startOfInterval = new Date(currentDate);
    if (isPastHalfHour) {
      // If it's past the half-hour mark, set minutes to 30
      startOfInterval.setMinutes(30, 0, 0);
    } else {
      // Otherwise, set minutes to 0
      startOfInterval.setMinutes(0, 0, 0);
    }

    console.log(`Start of Interval: ${startOfInterval}`);

    const ratings = await Rating.find({
      facility_id: facilityId,
      createdAt: { $gte: startOfInterval },
    });
    console.log(`Found ${ratings.length} ratings for facilityId: ${facilityId}`);

    let average = 1;
    if (ratings.length > 0) {
      average = ratings.reduce((acc, { rating }) => acc + rating, 0) / ratings.length;
    }
    console.log(`Calculated average: ${average}`);

    return average.toFixed(2);
  } catch (error) {
    console.error("Error in updateAndResetAverageRating:", error);
    throw new Error("Error fetching the average rating");
  }
};

app.get('/api/ratings/average/weight-room1', async (req, res) => {
  try {
    console.log("Fetching average rating for weight-room1");
    const average = await updateAndResetAverageRating('6599fa67d85aa7b7734fef3d');
    console.log(`Average rating for weight-room1: ${average}`);
    res.json({ average });
  } catch (error) {
    console.error("Error fetching the average rating for weight-room1:", error);
    res.status(500).json({ message: "Error fetching the average rating", error: error.toString() });
  }
});

app.get('/api/ratings/average/weight-room2', async (req, res) => {
  try {
    console.log("Fetching average rating for weight-room2");
    const average = await updateAndResetAverageRating('6599fa7dd85aa7b7734fef3f');
    console.log(`Average rating for weight-room2: ${average}`);
    res.json({ average });
  } catch (error) {
    console.error("Error fetching the average rating for weight-room2:", error);
    res.status(500).json({ message: "Error fetching the average rating", error: error.toString() });
  }
});

app.get('/api/ratings/average/upper-courts', async (req, res) => {
  try {
    console.log("Fetching average rating for upper-courts");
    const average = await updateAndResetAverageRating('659a0affc0d15d547c126925');
    console.log(`Average rating for upper-courts: ${average}`);
    res.json({ average });
  } catch (error) {
    console.error("Error fetching the average rating for upper-courts:", error);
    res.status(500).json({ message: "Error fetching the average rating", error: error.toString() });
  }
});

app.get('/api/ratings/average/lower-courts', async (req, res) => {
  try {
    console.log("Fetching average rating for lower-courts");
    const average = await updateAndResetAverageRating('659b382f10a04f1ccc8f2e6b');
    console.log(`Average rating for lower-courts: ${average}`);
    res.json({ average });
  } catch (error) {
    console.error("Error fetching the average rating for lower-courts:", error);
    res.status(500).json({ message: "Error fetching the average rating", error: error.toString() });
  }
});

/*cron.schedule('* * * * *', async () => {

  console.log('Cron job is running every minute!');
  await updateAndResetAverageRating('6599fa67d85aa7b7734fef3d'); // Facility ID for weight room 1 (upstairs)
  await updateAndResetAverageRating('6599fa7dd85aa7b7734fef3f'); // Facility ID for weight room 2 (downstairs)
  await updateAndResetAverageRating('659a0affc0d15d547c126925'); // Facility ID for upper courts
  await updateAndResetAverageRating('659b382f10a04f1ccc8f2e6b'); // Facility ID for lower courts
}, {
  scheduled: true,
  timezone: "America/New_York", // Adjust the timezone as needed
});*/

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
