require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection setup
let dbClient;

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await dbClient.connect();
    console.log("Connected to MongoDB Atlas");
    // Here you can set up a variable to access your database
    // Example: const db = client.db("myDatabaseName");
  } catch (e) {
    console.error(e);
    process.exit(1); // If connection fails, stop the server
  }
}

// Call the async function to connect to MongoDB
connectToMongoDB();

// Example of a route
app.get('/', (req, res) => {
  res.send('Gym Occupancy Tracker Home');
});

// Define other routes and middleware here

// Start the server after setting up MongoDB and routes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Keep a reference to the MongoDB client to close it when the app stops
process.on('SIGINT', async () => {
  if (dbClient) {
    await dbClient.close();
  }
  process.exit();
});
