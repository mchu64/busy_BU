<template>
  <div class="app flex-container" :class="{ isRootPage: isRootPage }">
    <!-- Header Section -->
    <div v-if="isRootPage" class="header">
      <h1>Busy-BU</h1>
      <h2>This is where you can find how busy the FitRec is!</h2>
    </div>


              <!-- Google OAuth Button -->
              <div>
      <button v-if="isRootPage" @click="handleGoogle" class="mx-auto border-4 bg-green-500">Sign In With Google</button>
    </div>
    <!-- Box Container Section -->
    <div class="box-container">
      <!-- ChatBot Component -->
      <ChatBot v-if="isRootPage" />




      <!-- Router Links -->
      <router-link v-if="isRootPage" to="/second-page" class="gym-info-box">
        <div>
          <h1>Upper Weight Room</h1>
          <p>Welcome to the Weight room! Check out the facilities and enjoy your workout.</p>
        </div>
      </router-link>


      <router-link v-if="isRootPage" to="/fifth-page" class="gym-info-box">
        <div>
          <h1>Lower Weight Room</h1>
          <p>Welcome to the Weight room! Check out the facilities and enjoy your workout.</p>
        </div>
      </router-link>



      <router-link v-if="isRootPage" to="/third-page" class="evaluate">
        <div>
          <h1>Rate our Facility</h1>
          <p>Please give us a rating on the population of the gym!</p>
        </div>
      </router-link>
    </div>



    <!-- Router Views -->
    <router-view v-if="isRootPage"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import ChatBot from './ChatBot.vue';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default {
  name: 'App',
  components: {
    ChatBot
  },
  computed: {
    isRootPage() {
      return this.$route.path === '/';
    },
  },
  methods: {
    async handleGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        // Handle successful sign-in
      } catch (error) {
        console.error("Error signing in with Google:", error);
        // Handle sign-in error
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
