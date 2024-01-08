<template>
    <div v-if="isSixthPage" class="header">
      <h1>Lower Courts</h1>
      <h2>Below is how busy the courts are.</h2>
    </div>
    <router-link v-if="isSixthPage" to="/" class="back">
      <div>Back</div>
    </router-link>
      <div class="courtbackground">
        <div v-if="isSixthPage" class="content2">
          <h1>This is Another Page!</h1>
          <p>This is my Fourth page.</p>
          <p>Average Weight room Rating: {{ averageRating }}</p>
          <!-- Other content for the second page -->
        </div>
        <router-view></router-view>
      </div>
    </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'AnotherPage',
    data() {
    return {
      averageRating: 0, // Initialize averageRating
    };
  },
    computed: {
      isSixthPage() {
        return this.$route.path === '/sixth-page';
      }
    },
    created() {
    this.fetchAverageRating();
  },
    methods: {
    fetchAverageRating() {
      axios.get('http://localhost:3000/api/ratings/average/lower-courts')
        .then(response => {
          console.log('Average rating response:', response.data); // Debugging line
          this.averageRating = response.data.average;
        })
        .catch(error => {
          console.error('Error fetching the average rating:', error);
        });
    },
  },
  };
  </script>
  
  <!--CSS Link-->
  
  <style>
    @import './Courts.css';
  </style>