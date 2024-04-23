const axios = require('axios');

const apiKey = '9ddd20af5a0fa9b592d46d1fa224095b';
const city = 'Boston';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const getWeather = async () => {
  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    
    // Extract temperature in Kelvin and convert to Fahrenheit
    const tempKelvin = weatherData.main.temp;
    const tempFahrenheit = (tempKelvin - 273.15) * 9/5 + 32;
    
    // Extract precipitation data
    const precipitation = weatherData.weather[0].description;
    
    return { temperature: tempFahrenheit, precipitation };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Error fetching weather data");
  }
};

module.exports = getWeather;