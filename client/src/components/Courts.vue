<template>
  <div v-if="isFourthPage" class="header">
    <h1>Courts</h1>
    <h2>Below is how busy the courts are.</h2>
  </div>
  <router-link v-if="isFourthPage" to="/" class="back">
    <div>Back</div>
  </router-link>
    <div class="courtbackground">
      <div v-if="isFourthPage" class="content2">
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
    isFourthPage() {
      return this.$route.path === '/fourth-page';
    }
  },
  created() {
    this.fetchAverageRating();
  },
  methods: {
    fetchAverageRating() {
      axios.get('http://localhost:3000/api/ratings/average/upper-courts')
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