import { createApp } from 'vue';
import Index from './components/Index.vue';
import Weightroom1 from './components/Weightroom1.vue';
import Weightroom2 from './components/Weightroom2.vue';
import Court2 from './components/Courts2.vue';
import Survey from './components/Survey.vue';
import Courts from './components/Courts.vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'vue';



// Define your routes
const routes = [
  { path: '/second-page', component: Weightroom1 },
  { path: '/third-page', component: Survey },
  { path: '/fourth-page', component: Courts },
  { path: '/fifth-page', component: Weightroom2 },
  { path: '/sixth-page', component: Court2 },
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