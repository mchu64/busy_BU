
<template>
    <div class="wrapper">
      <div class="title">Simple Chatbot</div>
      <div class="box">
        <div class="item" v-for="message in chatMessages" :key="message.id">
          <div class="icon">
            <i class="fa fa-user"></i>
          </div>
          <div class="msg">
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>
      
      <div class="typing-area">
        <button @click="askGymQuestion">Should I go to the gym today?</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        chatMessages: []
      };
    },
    methods: {
      async askGymQuestion() {
        try {
          const response = await axios.post('http://localhost:3000/chat');
          this.chatMessages.push({ id: this.chatMessages.length + 1, text: response.data.message });
        } catch (error) {
          console.error("Error processing your request:", error);
          this.chatMessages.push({ id: this.chatMessages.length + 1, text: 'Error processing your request' });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css?family=Raleway|Ubuntu&display=swap");
  
  /* Paste the provided CSS styles here */

  </style>