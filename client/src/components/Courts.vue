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
        <!-- Other content for the second page -->
      </div>
      <router-view></router-view>
    </div>
  </template>

<script>
export default {
  name: 'AnotherPage',
  computed: {
    isFourthPage() {
      return this.$route.path === '/fourth-page';
    }
  }
};
</script>

<!--CSS Link-->

<style>
  @import './Courts.css';
</style>