import Vue from 'vue';
import VueRouter from 'vue-router';

import Lobby from '../views/Lobby.vue';
import Chatroom from '../views/Chatroom.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/game',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: (to, from, next) => {
      if (store.state.room.state === 'lobby') {
        next({ name: 'Lobby' });
      } else {
        next();
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
