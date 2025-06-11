<template>
  <div class="container">
    <h2>Welcome, {{ user.name }}</h2>
    <div class="user-info">
      <div class="color-indicator" :style="{ backgroundColor: getColor(user.color) }"></div>
      <div class="info-text">
        <p><strong>Color:</strong> {{ user.color || 'N/A' }}</p>
        <p><strong>Office:</strong> {{ user.office_name || 'N/A' }}</p>
        <p><strong>Class:</strong> {{ user.office_class || 'N/A' }}</p>
        <p><strong>Rank:</strong> {{ user.rank || 'N/A' }}</p>
      </div>
    </div>

    <div class="actions">
      <br>
      <br>
      <button 
        @click="$router.push('/request-form')" 
        v-if="user.rank === 'Head' && user.office_class === 'Sender'"
        class="action-button"
      >
        Make a New Request
      </button>
      <br>
      <br>
      <button @click="logout" class="logout-button">Log Out</button>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'DashboardView',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || {},
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.push('/login');
    },

    // Map color names to hex values
    getColor(colorName) {
      const colors = {
        Black: '#000000',
        White: '#FFFFFF',
        Blue: '#0074D9',
        Purple: '#8E44AD',
        Yellow: '#FFDC00',
      };

      return colors[colorName] || '#CCCCCC'; // Default if unknown
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

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
}

.color-indicator {
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  border-radius: 2px;
}

.info-text {
  font-size: 16px;
}

.info-text p {
  margin: 4px 0;
}
</style>