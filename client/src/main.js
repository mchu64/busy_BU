import { createApp } from 'vue';
import Index from './components/Index.vue';
import Weightroom from './components/Weightroom.vue';
import Survey from './components/Survey.vue';
import Courts from './components/Courts.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'vue';



// Define your routes
const routes = [
  { path: '/third-page', component: Survey },
  { path: '/second-page', component: Weightroom },
  { path: '/fourth-page', component: Courts },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  //transition: false,
});

// Create the Vue app
const app = createApp(Index)


// Use the router with the app
app.use(router);

// Mount the app to the '#app' element in your HTML
app.mount('#app');