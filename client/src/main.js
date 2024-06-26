import { createApp } from 'vue';
import Index from './components/Index.vue';
import Weightroom1 from './components/Weightroom1.vue';
import Weightroom2 from './components/Weightroom2.vue';
import Survey from './components/Survey.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  { path: '/second-page', component: Weightroom1 },
  { path: '/third-page', component: Survey },
  { path: '/fifth-page', component: Weightroom2 },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create the Vue app
const app = createApp(Index)

// Use the router with the app
app.use(router);

// Mount the app to the '#app' element in your HTML
app.mount('#app');
