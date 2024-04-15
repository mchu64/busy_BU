<template>
  <div>
    <div v-if="isFifthPage" class="header">
      <h1>Weight Room 2</h1>
      <h2>Below is how busy the weight rooms are.</h2>
      <h2> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfC59OBcIGHbxW38LdatOmalNIOiOT91RZl4vipeeygkDEQ3A/viewform" style = "color: lightblue;" target = "_blank">Give us feedback on the site</a></h2>

    </div>
    <router-link v-if="isFifthPage" to="/" class="back">
      <div>Back</div>
    </router-link>
    <div class="weightroombackground">
      <div v-if="isFifthPage" class="content1">
        <p>Average Rating: {{ averageRating }} out of 5</p>

        <!-- Other content for the second page -->
      </div>
      <div class="legend-box">
          <p>Legend:</p>
          <p>1 = Not Busy</p>
          <p>2 = Somewhat Busy</p>
          <p>3 = Averagely Busy</p>
          <p>4 = Pretty Busy</p>
          <p>5 = Really Busy</p>
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
      axios.get('https://enigmatic-bastion-78775-506d46995f63.herokuapp.com/api/ratings/average/weight-room2')
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