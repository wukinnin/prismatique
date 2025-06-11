<template>
  <div class="container">
    <h2>Make a New Supply Request</h2>
    <form @submit.prevent="submitRequest">
      <p><strong>Label Name (required)</strong></p>
      <label>
        <input type="text" v-model="item.name" required />
      </label>
      <br>
      <p><strong>Quantity (required)</strong></p>
      <label>
        <input type="number" v-model.number="item.quantity" required />
      </label>
      <br>
      <p><strong>Unit (optional)</strong></p>
      <label>
        <input type="text" placeholder="Ream, Box, Set, etc." v-model="item.unit" />
      </label>
      <br>
      <p><strong>Notes (optional)</strong></p>
      <label>
        <textarea v-model="item.notes"></textarea>
      </label>
      <br>
      <br>
      <button type="submit">Submit Request</button>
      <br>
      <p v-if="message">{{ message }}</p>
    </form>
    <br>
    <button 
        @click="$router.push('/dashboard')">
        Dashboard
      </button>
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

<style scoped>
input,
textarea {
  width: 90%;
  padding: 5px;
  font-size: 1rem;
}
</style>