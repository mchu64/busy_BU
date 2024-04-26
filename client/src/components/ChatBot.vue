<template>
    <div class="chat-container">
      <div class="chat-header">Gym Chatbot</div>
      <div class="chat-messages" v-for="message in chatMessages" :key="message.id">
        {{ message.text }}
      </div>
      <button @click="askGymQuestion">Should I go to the gym today?</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        chatMessages: [
          { id: 1, text: 'Hello! I am Busy BU\'s chatbot assistant.' }
        ]
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
  </script><style scoped>
.chat-container {
  max-width: 350px; /* increased width */
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8); /* added transparent background */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-bottom: 1px solid #333;
  font-weight: bold;
  font-size: 18px;
}

.chat-messages {
  padding: 20px;
  background-color: rgba(247, 247, 247, 0.8); /* added transparent background */
  border-radius: 10px;
  max-height: 70px;
  overflow-y: auto;
}

.chat-messages > div {
  margin-bottom: 20px;
}

.chat-messages > div:last-child {
  margin-bottom: 0;
}

button[type="button"] {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #3e8e41;
}

.chat-messages > div {
  color: #333;
  background-color: rgba(247, 247, 247, 0.8); /* added transparent background */
  padding: 10px;
  border-radius: 10px;
}

@media (max-width: 400px) {
  .chat-container {
    max-width: 100%;
    margin: 20px;
  }
}
</style>