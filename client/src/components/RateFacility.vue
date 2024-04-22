<template>
  <div>
    <div class="ratefacilitybackground"></div>
    <div class="header" v-if="isThirdPage">
      <h1>Ratings</h1>
      <h2>Below is where you can rate the facility</h2>
    </div>
  
    <div class="content" v-if="!submitted">
      <h2>Score the Busyness</h2>
      <label>
        Where are you currently?
        <div>
          <input type="radio" id="upperWeightRoom" value="gym1" v-model="section" />
          <label for="upperWeightRoom">Upper Weight room</label>
        </div>
        <div>
          <input type="radio" id="lowerWeightRoom" value="gym2" v-model="section" />
          <label for="lowerWeightRoom">Lower Weight room</label>
        </div>
      </label>
      <br />
      <label>
        What would you rate it 1-5?
        <div>
          <input type="radio" id="rating1" value="1" v-model="rating" />
          <label for="rating1">1 - Not busy</label>
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
          <label for="rating5">5 - Very Busy</label>
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
      section: 'gym1',  // Default to 'gym1' for initial value
      rating: '1',
      submitted: false,
    };
  },
  computed: {
    isThirdPage() {
      return this.$route.path === '/third-page';
    },
  },
  methods: {
    submitRating() {
      const facilityIdMap = {
        'gym1': '6599fa67d85aa7b7734fef3d',
        'gym2': '6599fa7dd85aa7b7734fef3f'
      };

      const payload = {
        facility_id: facilityIdMap[this.section],
        rating: parseInt(this.rating),
      };

      axios.post('https://enigmatic-bastion-78775-506d46995f63.herokuapp.com/api/ratings', payload)
        .then(response => {
          this.submitted = true;
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      this.resetForm();
    },
    resetForm() {
      this.section = 'gym1';
      this.rating = '1';
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
@import './RateFacility.css';
</style>
