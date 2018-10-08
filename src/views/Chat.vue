<template>
    <div class="chat container">
        <h2 class="center teal-text">Welcome {{ name }}</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll> <!-- autoscroll -->
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{ message.name }}: </span>
                        <span class="grey-text text-darken-3">{{ message.content }}</span>
                        <span class="grey-text time">{{ message.timestamp }}</span>
                    </li>
                </ul>
                <div class="car-action">
                    <ChatNewMessage :name="name " />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ChatNewMessage from '@/components/ChatNewMessage.vue';
import db from '@/firebase/init';
import moment from 'moment';

export default {
  name: 'Chat',

  data() {
    return {
      messages: [],
    };
  },

  props: ['name'], // prop ricevuta da un'altra vista

  components: {
    ChatNewMessage,
  },

  created() {
    const ref = db.collection('messages').orderBy('timestamp');
    // ordinati in base alla proprietà 'timestamp' presente in ogni doc

    // imposta un listener su quella collection
    // ad ogni cambiamento chiama la cb con uno snapshot del db in quel momento

    // riceviamo anche un primo snapshot con lo status iniziale
    ref.onSnapshot((snapshot) => {
      // i tipi (type) di cambiamento di ogni documento possono essere:
      // added, delete, update, ecc
      const changes = snapshot.docChanges();

      changes.forEach((change) => {
        if (change.type === 'added') {
          // ogni documento (messaggio) aggiunto
          const { doc } = change;

          // viene pushato nel nostro array contenente tutti i messaggi
          this.messages.push({
            id: doc.id, // id generato da firebase
            name: doc.data().name,
            content: doc.data().content,
            // usiamo moment.js per formattare la data
            timestamp: moment(doc.data().timestamp).format('LLLL'),
          });
        }
      });
    });
  },
};
</script>

<style>
.chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
}

.chat span {
    font-size: 1.4em;
    margin-bottom: 10px;
}

.chat .time {
    display: block;
    font-size: 0.8em;
}

/* autoscrolling */
.messages {
    max-height: 300px;
    overflow: auto;
}

/* custom scrollbar solo per chrome */
.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}

</style>
