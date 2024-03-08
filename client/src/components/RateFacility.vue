<template>
  <div>
    <div class="ratefacilitybackground"></div>
    <div class="header" v-if = "isThirdPage">
      <h1>Ratings</h1>
      <h2>Below is where you can rate the facility</h2>
    </div>
  
    <div class="content" v-if="!submitted">
      <h2 v-if="!submitted" class="" >Rate Our Facility</h2>
      <label>
        Where are you currently?
        <div>
          <input type="radio" id="upperWeightRoom" value="gym1" v-model="section" />
          <label for="gym">Upper Weight room</label>
        </div>
        <div>
          <input type="radio" id="lowerWeightRoom" value="gym2" v-model="section" />
          <label for="gym">Lower Weight room</label>
        </div>
        <div>
          <input type="radio" id="Uppercourts" value="upper-courts" v-model="section" />
          <label for="courts">Upper Courts</label>
        </div>
        <div>
          <input type="radio" id="Lowercourts" value="lower-courts" v-model="section" />
          <label for="courts">Lower Courts</label>
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
        'gym1': '6599fa67d85aa7b7734fef3d',
        'gym2': '6599fa7dd85aa7b7734fef3f',  // Replace with actual ObjectId
        'upper-courts': '659a0affc0d15d547c126925',  // Replace with actual ObjectId
        'lower-courts': '659b382f10a04f1ccc8f2e6b',
      };

      const payload = {
        facility_id: facilityIdMap[this.section],
        rating: parseInt(this.rating),
      };

      // axios to send a POST request
      axios.post('enigmatic-bastion-78775-506d4/api/ratings', payload)
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
      this.$router.push('/');
    },
  },
};
</script>

<!--CSS Link-->
<style scoped>

@import './RateFacility.css';

</style>