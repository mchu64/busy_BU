require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose'); 
const cron = require('node-cron');
const Facility = require('./models/facility.js');
const Rating = require('./models/rating.js');
const getWeather = require('./weather.js');
const axios = require('axios');

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



app.post('/chat', async (req, res) => {
  try {
      // Fetch weather data
      const weatherData = await getWeather();
      console.log(weatherData.precipitation);  // Log to verify structure

      const database2 = await axios.get('https://enigmatic-bastion-78775-506d46995f63.herokuapp.com/api/ratings/average/weight-room2');
      const database1 = await axios.get('https://enigmatic-bastion-78775-506d46995f63.herokuapp.com/api/ratings/average/weight-room1')

      const average1 = database1.data.average;
      const average2 = database2.data.average;
      const totalAverage = (parseFloat(average1) + parseFloat(average2)) / 2;  

      console.log('Average of the two averages:', totalAverage);

// Start constructing the definitive statement based on weather data
let question = "Should I go to the gym based on these factors. The temperature today is " + weatherData.temperature.toFixed(1) + "°F. Imagine in your response that my question is Should I go to the gym today so make sure the grammar makes sense";

// Handle weather conditions and totalAverage rating
if (totalAverage === 1) {
  question += " The gym is not busy at all. It's the best time to go!";
} else if (totalAverage === 2) {
  question += " The gym is not very busy. It's recommended to go.";
} else if (totalAverage >= 4) {
  question += " The gym is very busy. It's recommended not to go.";
} else if (totalAverage === 5) {
  question += " The gym is extremely busy. It's best to avoid going at all.";
} else {
  // Handle weather conditions and precipitation within a comfortable temperature range
  if (weatherData.temperature <= 32) {
    question += " It's freezing cold. It's definitely not a good day to go to the gym. Tell me not to go";
  } else if (weatherData.temperature <= 50) {
    question += " It's quite chilly. Tell me maybe to skip the gym and stay warm.";
  } else if (weatherData.temperature > 90) {
    question += " It's extremely hot. Avoid going to the gym in this heat, tell me to go outside for my workout.";
  } else {
    if (weatherData.precipitation.includes("Thunderstorm")) {
      question += " With thunderstorms expected, it's unsafe to go to the gym today.";
    } else if (weatherData.precipitation.includes("Drizzle")) {
      question += " It's drizzling. Tell me maybe to consider going to the gym, but be cautious.";
    } else if (weatherData.precipitation.includes("Rain")) {
      question += " It's raining. Not a good day for the gym. Tell me not to go.";
    } else if (weatherData.precipitation.includes("Snow")) {
      question += " It's snowy. A terrible day for any outdoor activity, including the gym.";
    } else if (weatherData.precipitation.includes("Clear")) {
      question += " The sky is clear. Tell me it's a perfect day to go to the gym!";
    } else if (weatherData.precipitation.includes("Clouds")) {
      question += " It's just cloudy. A decent day for the gym. Tell me maybe to go.";
    } else {
      question += ` The weather is showing ${weatherData.precipitation}. It's a suitable day for the gym unless conditions worsen.`;
    }

    // If the temperature is in the ideal range
    if (weatherData.temperature > 50 && weatherData.temperature <= 90) {
      question += " Also, the temperature is perfect for a gym session today!";
    }
  }
}


// If the temperature is in the ideal range
if (weatherData.temperature > 50 && weatherData.temperature <= 90) {
  question += " Also, the temperature is perfect for a gym session today!";
}



      // Send request to OpenAI API
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
      }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
          }
      });

      // Extract bot response
      const botMessage = response.data.choices[0].message.content;

      // Send bot response to the client
      res.json({ message: botMessage });
  } catch (error) {
      console.error("Error processing your request:", error);
      res.status(500).send('Error processing your request');
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
