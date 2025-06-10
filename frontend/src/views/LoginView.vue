<!-- src/views/LoginView.vue -->
<template>
  <div class="login-container">
    <h2>Prismatique Login</h2>
    <p>Simulate RFID Scan:</p>
    <button @click="simulateRFIDScan">Press Ctrl + F1 to Log In</button>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'LoginView',
  methods: {
    simulateRFIDScan() {
      // Simulate RFID signature input
      const simulatedSignature = prompt("Enter RFID Signature:");

      if (!simulatedSignature) {
        alert('RFID scan cancelled.');
        return;
      }

      // Send login request to backend
      api.post('/auth/login', {
        digital_signature: simulatedSignature
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          alert(`Logged in as ${response.data.user.name}`);
          this.$router.push('/dashboard');
        } else {
          alert('Invalid RFID Signature');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('Failed to log in. Please try again.');
      });
    }
  }
};
</script>

<!-- <style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style> -->