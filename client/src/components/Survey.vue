<!-- src/App.vue -->
<template>
  <div class="app">
    <router-link v-if="isThirdPage" to="/" class="back">
      <div>
        Back
      </div>
    </router-link>
    <div v-if="isThirdPage" class="content">
      <h1></h1>
      <p></p>
      <!-- Other content for the third page -->
    </div>
    <router-view />
    <RateFacility v-if="isThirdPage && isSurveyVisible" />
  </div>
</template>

<script>
import RateFacility from '@/components/RateFacility.vue';

export default {
  name: 'ThirdPage',
  components: {
    RateFacility,
  },
  computed: {
    isThirdPage() {
      return this.$route.path === '/third-page';
    },
    isSurveyVisible() {
      // You can conditionally show the survey based on certain criteria
      return true;
    },
  },
};
</script>

<style scoped>
  .back {
    position: fixed;
    top: 20px;
    left: 20px;
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background-color: rgba(12, 12, 12, 0.4); /* Subtle transparent gray */
    border: 2px solid rgba(128, 128, 128, 0.5); /* Slightly transparent border */
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s ease, border 0.3s ease;
  }
  
  .back:hover {
    background-color: rgba(169, 169, 169, 0.6); /* Darker gray on hover */
    border: 2px solid rgba(128, 128, 128, 0.7); /* Darker border on hover */
    transform: scale(1.05); /* Slight scale on hover for depth effect */
    cursor: pointer;
  }
  
  .content {
    margin-top: 60px; /* Adjusted margin-top */
    margin-left: 10px;
  }
  </style>