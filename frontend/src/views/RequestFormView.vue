<!-- src/views/RequestFormView.vue -->
<template>
  <div class="request-form">
    <h2>Make a New Supply Request</h2>
    <form @submit.prevent="submitRequest">
      <label>
        Item Name:
        <input type="text" v-model="item.name" required />
      </label>

      <label>
        Quantity:
        <input type="number" v-model.number="item.quantity" required min="1" />
      </label>

      <label>
        Unit:
        <input type="text" v-model="item.unit" placeholder="e.g., Piece, Ream, Liter" required />
      </label>

      <label>
        Notes (Optional):
        <textarea v-model="item.notes"></textarea>
      </label>

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
      // Get user info from localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.id) {
        this.message = 'You must be logged in as a Head in a Sender office.';
        return;
      }

      try {
        const response = await api.post('/requests/create', {
          requester_id: user.id,
          sender_office_id: user.office_id,
          receiver_office_id: 2, // Hardcoded PCO (Receiver Office ID)
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
          this.message = '✅ Request submitted successfully!';
          this.resetForm();
          setTimeout(() => {
            this.$router.push('/dashboard');
          }, 1500);
        }
      } catch (error) {
        console.error('Failed to submit request:', error);
        this.message = '❌ Failed to submit request. Please try again.';
      }
    },
    resetForm() {
      this.item = {
        name: '',
        quantity: null,
        unit: '',
        notes: '',
      };
    },
  },
};
</script>

<style scoped>
.request-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

form label {
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
}

form input,
form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form textarea {
  height: 80px;
  resize: vertical;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

p {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

a {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
}
</style>