<template>
  <div>
    <div class="ratefacilitybackground"></div>
    <div class="header" v-if = "isThirdPage">
      <h1>Courts</h1>
      <h2>Below is how busy the courts are.</h2>
    </div>
  
    <div class="content" v-if="!submitted">
      <h2 v-if="!submitted" class="" >Rate Our Facility</h2>
      <label>
        Where are you currently?
        <div>
          <input type="radio" id="gym" value="gym" v-model="section" />
          <label for="gym">Weight room</label>
        </div>
        <div>
          <input type="radio" id="courts" value="courts" v-model="section" />
          <label for="courts">Courts</label>
        </div>
      </label>
      <br />
      <label>
        What would you rate it 1-5?
        <div>
          <input type="radio" id="rating1" value="1" v-model="rating" />
          <label for="rating1">1</label>
        </div>
        <div>
          <input type="radio" id="rating2" value="2" v-model="rating" />
          <label for="rating2">2</label>
        </div>
        <div>
          <input type="radio" id="rating3" value="3" v-model="rating" />
          <label for="rating3">3</label>
        </div>
        <div>
          <input type="radio" id="rating4" value="4" v-model="rating" />
          <label for="rating4">4</label>
        </div>
        <div>
          <input type="radio" id="rating5" value="5" v-model="rating" />
          <label for="rating5">5</label>
        </div>
      </label>
      <br />
      <button @click="submitRating">Submit</button>
    </div>
        <div class="content" v-if="submitted">
          <p>Thank you for submitting!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      section: 'gym',
      rating: '1',
      submitted: false,
    };
  },
  methods: {
    submitRating() {
      // Convert section to MongoDB ObjectId
      const facilityIdMap = {
        'gym': '6599fa67d85aa7b7734fef3d',  // Replace with actual ObjectId
        'courts': '659a0affc0d15d547c126925'  // Replace with actual ObjectId
      };

      const payload = {
        facility_id: facilityIdMap[this.section],
        rating: parseInt(this.rating),
      };

      // axios to send a POST request
      axios.post('/api/ratings', payload)
        .then(response => {
          // Handle the response from the server
          this.submitted = true;
          console.log(response.data);
          // Redirect or show a message
        })
        .catch(error => {
          // Handle any errors from the request
          console.error('Error:', error);
        });

      this.resetForm();
    },
    isThirdPage() {
      return this.$route.path === '/third-page';
    },
    resetForm() {
      this.section = 'gym';
      this.rating = '1';
    },
  },
};
</script>

<!--CSS Link-->
<style scoped>

@import './RateFacility.css';

</style>