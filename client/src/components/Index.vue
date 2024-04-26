<template>
  <div class="app flex-container" :class="{ isRootPage: isRootPage }">
    <!-- Header Section -->
    <div v-if="isRootPage" class="header">
      <h1>Busy BU</h1>
      <h2>This is where you can find how busy the FitRec is!</h2>
      <h2><a style="color: lightblue;" target="_blank">Find out if you should go to the gym today!</a></h2>
    </div>

    <!-- Box Container Section -->
    <div class="box-container">
      <!-- Router Links -->

      <router-link v-if="isRootPage" to="/third-page" class="evaluate">
        <div>
          <h1>Rate Busyness</h1>
          <p>Please give us a rating on the population of the gym!</p>
        </div>
      </router-link>

      <router-link v-if="isRootPage" to="/second-page" class="gym-info-box">
        <div>
          <h1>Upper Weight Room</h1>
          <p>This is how you can check the busyness of the upper weight room!</p>
        </div>
      </router-link>

      
      <!-- Router Links -->
      <router-link v-if="isRootPage" to="/fifth-page" class="gym-info-box">
        <div>
          <h1>Lower Weight Room</h1>
          <p>This is how you can check the busyness of the bottom weight room!</p>
        </div>
      </router-link>
    </div>

    <!-- Weather Box Section -->
    <div class="gym-info-box" id="weather-container">
      <!-- Weather data display -->
    </div>

    <!-- ChatBot Component -->
    <ChatBot />
  </div>
</template>

<script>
import axios from 'axios';
import ChatBot from './ChatBot.vue';

export default {
  name: 'App',
  components: {
    ChatBot
  },
  data() {
    return {
      weather: {
        temperature: null,
        precipitation: null
      },
      userQuestion: '',
      botResponse: ''
    };
  },
  computed: {
    isRootPage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    async askQuestion() {
      try {
        const response = await axios.post('http://localhost:3000/chat', { question: this.userQuestion });
        this.botResponse = response.data.message;
      } catch (error) {
        console.error("Error processing your request:", error);
        this.botResponse = 'Error processing your request';
      }
    }
  },
  mounted() {
    axios.get('http://localhost:3000/weather')
      .then(response => {
        console.log("Weather data received:", response.data);
        this.weather = response.data;
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        this.weather = { temperature: "N/A", precipitation: "N/A" }; // Set default values
      });
  },
};
</script>

<style scoped>
@import './Index.css';
</style>
