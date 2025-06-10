<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard">
    <h2>Welcome, {{ user.name }}</h2>
    <p>Rank: {{ user.rank }}</p>
    <p>Office: {{ user.office_name }}</p>

    <h3>Pending Requests</h3>
    <ul v-if="requests.length > 0">
      <li v-for="request in requests" :key="request.id">
        Request ID: {{ request.id }} | Status: {{ request.status }}
      </li>
    </ul>
    <p v-else>No pending requests.</p>

    <router-link to="/request-form">Make a New Request</router-link>
    <br />
    <br>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'DashboardView',
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'));
    },
  },
  data() {
    return {
      requests: [],
    };
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await api.get('/requests/user');
        this.requests = response.data;
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push({ name: 'Login' }); // Use named route for better clarity
    },
  },
};
</script>


<!-- <style scoped>
.dashboard {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style> -->