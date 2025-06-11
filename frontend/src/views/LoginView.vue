<!-- src/views/LoginView.vue -->
<template>
  <div class="container">
    <p>Simulate RFID Scan with <strong>Shift + [Number]</strong></p>
    <p>Example: <strong>Shift + 1</strong>, <strong>Shift + 2</strong>, etc.</p>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'LoginView',
  mounted() {
    // Add event listener on component mount
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    handleKeyDown(event) {
      // Check if Shift key is pressed
      if (!event.shiftKey) return;

      // Map key code to digital signature
      const keyMap = {
        'Digit1': 'DS_001',
        'Digit2': 'DS_002',
        'Digit3': 'DS_003',
        'Digit4': 'DS_004',
        'Digit5': 'DS_005',
        'Digit6': 'DS_006',
        'Digit7': 'DS_007',
        'Digit8': 'DS_008',
        'Digit9': 'DS_009',
        'Digit0': 'DS_010',
      };

      const keyName = event.code;
      const digitalSignature = keyMap[keyName];

      if (digitalSignature) {
        this.loginWithDigitalSignature(digitalSignature);
      }
    },
    async loginWithDigitalSignature(signature) {
      try {
        const response = await api.post('/auth/login', {
          digital_signature: signature,
        });

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          alert(`Logged in as ${response.data.user.name}`);
          this.$router.push('/dashboard');
        } else {
          alert('Invalid RFID Signature');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Failed to log in. Please try again.');
      }
    },
  },
};
</script>