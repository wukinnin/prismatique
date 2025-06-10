<!-- src/views/DashboardView.vue -->
<template>
  <div class="dashboard">
    <h2>Welcome, {{ user.name }}</h2>
    <p>Rank: {{ user.rank }}</p>
    <p>Office: {{ user.office_name }}</p>

    <!-- Quick Stats -->
    <div class="stats">
      <h3>Quick Stats</h3>
      <p>Pending Requests: {{ pendingRequestsCount }}</p>
    </div>

    <!-- Make a New Request Button (Only for Sender Heads) -->
    <div class="actions">
      <button 
        @click="$router.push('/request-form')" 
        v-if="user.rank === 'Head' && user.office_class === 'Sender'"
        class="action-button"
      >
        Make a New Request
      </button>
    </div>

    <!-- Logout Button -->
    <button @click="logout" class="logout-button">Logout</button>
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

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stats {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-left: 4px solid #3498db;
  border-radius: 4px;
}

.actions {
  margin-top: 30px;
}

.action-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
}

.action-button:hover {
  background-color: #2980b9;
}

.logout-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>