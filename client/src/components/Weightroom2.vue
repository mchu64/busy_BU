<template>
    <div>
      <div v-if="isFifthPage" class="header">
        <h1>Weight Room 2</h1>
        <h2>Below is how busy the weight rooms are.</h2>
      </div>
      <router-link v-if="isFifthPage" to="/" class="back">
        <div>Back</div>
      </router-link>
      <div class="weightroombackground">
        <div v-if="isFifthPage" class="content1">
          <p>Average Weight room Rating: {{ averageRating }}</p>
          <!-- Other content for the second page -->
        </div>
        <div class="blur-background"></div>
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'WeightRoom',
    data() {
      return {
        averageRating: 0, // Initialize averageRating
      };
    },
    computed: {
      isFifthPage() {
        return this.$route.path === '/fifth-page';
      },
    },
    created() {
      this.fetchAverageRating();
    },
    methods: {
      fetchAverageRating() {
        axios.get('http://localhost:3000/api/ratings/average/weight-room2')
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
  <style scoped>
  @import './Weightroom.css';
  </style>
  