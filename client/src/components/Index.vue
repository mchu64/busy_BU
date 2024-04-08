<template>
  <div class="app flex-container" :class="{ isRootPage: isRootPage }" >
    
    <!-- Header Section -->
    <div v-if="isRootPage" class="header">
      <h1>Busy-BU(BETA)</h1>
      <h2>This is where you can find how busy the FitRec is!</h2>
      <h2> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfC59OBcIGHbxW38LdatOmalNIOiOT91RZl4vipeeygkDEQ3A/viewform" style = "color: lightblue;" target = "_blank">Give us feedback on the site</a></h2>
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


      <router-link v-if="isRootPage" to="/fourth-page" class="courts">
        <div>
          <h1>Upper Courts</h1>
          <p>This is how you can check the busyness of the upper courts!</p>
        </div>
      </router-link>

      <router-link v-if="isRootPage" to="/sixth-page" class="courts">
        <div>
          <h1>Lower Courts</h1>
          <p>This is how you can check the busyness of the lower courts!</p>
        </div>
      </router-link>
    </div>
  

    <!-- Router Views -->
    <router-view v-if="isRootPage"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isRootPage() {
      return this.$route.path === '/';
    },
  },
};
</script>

<!--CSS Link-->

<style scoped>
@import './Index.css';
</style>