<template>
    <div class="new-message">
        <form @submit.prevent="addMessage">
            <label for="new-message">New Message (enter to add):</label>
            <input type="text" name="new-message" v-model="newMessage">
            <!-- in automatico la pressione di enter nell'input fa submittare il form -->

            <p class="red-text" v-if="feedback">{{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'NewMessage',
  props: ['name'],
  data() {
    return {
      newMessage: null,
      feedback: null,
    };
  },
  methods: {
    async addMessage() {
      if (this.newMessage) {
        this.newMessage = null;
        try {
          // se la collection nn esistesse ci pensa firebase a crearla
          await db.collection('messages').add({
            content: this.newMessage,
            name: this.name,
            timestamp: Date.now(),
          });
        } catch (err) {
          console.log(err);
        }
        this.feedback = null;
      } else {
        this.feedback = 'You must enter a message in order to send one!';
      }
    },
  },
};
</script>

<style>

</style>
