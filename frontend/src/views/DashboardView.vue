<!-- src/views/DashboardView.vue -->
<template>
  <div class="container">
    <h2>Welcome, {{ user.name }}</h2>
    <p>Rank: {{ user.rank }}</p>
    <p>Office: {{ user.office_name }}</p>

    <!-- Quick Stats -->
    <div class="stats">
      <h3>Quick Stats</h3>
      <p>Pending Requests: {{ pendingRequestsCount }}</p>
    </div>

    <br>
    <button @click="$router.push('/request-form')" v-if="user.rank === 'Head'" class="action-button">Make a New Request</button>
    <br>
    <br>
    <button @click="logout">Logout</button>
    
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'DashboardView',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
      pendingRequestsCount: 0,
    };
  },
  created() {
    this.fetchPendingRequests();
  },
  methods: {
    async fetchPendingRequests() {
      try {
        const response = await api.get('/requests/user');
        this.pendingRequestsCount = response.data.filter(req => req.status === 'Pending').length;
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    },
  },
};
</script>