// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import RequestFormView from '../views/RequestFormView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/request-form',
    name: 'RequestForm',
    component: RequestFormView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;