<!-- src/views/RequestFormView.vue -->
<template>
  <div class="request-form">
    <h2>Make a New Supply Request</h2>
    <form @submit.prevent="submitRequest">
      <label>
        Item Name:
        <input type="text" v-model="item.name" required />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" v-model.number="item.quantity" required />
      </label>
      <br />
      <label>
        Unit:
        <input type="text" v-model="item.unit" />
      </label>
      <br />
      <label>
        Notes:
        <textarea v-model="item.notes"></textarea>
      </label>
      <br />
      <button type="submit">Submit Request</button>
    </form>
    <p v-if="message">{{ message }}</p>
    <router-link to="/dashboard">Back to Dashboard</router-link>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'RequestFormView',
  data() {
    return {
      item: {
        name: '',
        quantity: null,
        unit: '',
        notes: '',
      },
      message: '',
    };
  },
  methods: {
    async submitRequest() {
      try {
        const response = await api.post('/requests/create', {
          requester_id: this.user.id,
          sender_office_id: this.user.office_id,
          receiver_office_id: 2, // Hardcoded for PCO (Receiver Office)
          notes: this.item.notes,
          items: [
            {
              item_name: this.item.name,
              quantity: this.item.quantity,
              unit: this.item.unit,
            },
          ],
        });

        if (response.status === 201) {
          this.message = 'Request submitted successfully!';
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 1500);
        }
      } catch (error) {
        console.error('Failed to submit request:', error);
        this.message = 'Failed to submit request. Please try again.';
      }
    },
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'));
    },
  },
};
</script>

<!-- <style scoped>
.request-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input,
textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 1rem;
}
</style> -->