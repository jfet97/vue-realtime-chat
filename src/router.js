import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Chat from '@/views/Chat.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      // abilitiamo il passaggio di prop a questa vista da un'altra vista,
      // a differenza dei parametri non è visibile nell'url

      // route guard
      beforeEnter: (to, from, next) => {
        // to -> info sul component sul quale stiamo andando
        // from -> da dove veniamo
        // next -> funzione per decidere dove andare

        // to.params.name; è undefined se, ad esempio, inseriamo /chat nell'url a mano
        // è true solo se un'altra vista passa la prop name

        if (to.params.name) {
          next(); // chiamata così fa andare direttamente nel chat component
        } else {
          next({ name: 'Welcome' }); // altrimenti, come fosse un redirect, torna/rimani nella Welcome
        }

        // dovresti inserire un controllo affinché chi è già nella chat
        // possa rimanere senza essere reindirizzato
      },
    },
  ],
});
