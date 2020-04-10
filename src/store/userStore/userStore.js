import Vue from 'vue';
// import {ADMIN_KEY} from '../../secrets/ApiSecret'

export const NOT_SET = Symbol('NOT_SET');

const userStore = new Vue({
  data: {
    user: NOT_SET,
    //isAdmin: null
  },
  methods: {
    setUser(user) {
      this.user = user;
      
    },
    clearUser() {
      this.user = null;
    //   this.isAdmin= null;
    }
  },
  computed: {
    isLogged() { return !!this.user; },
    // isAdmin() {return this.localStorage.getItem('userId')===ADMIN_KEY;}
  }
});

export default userStore;
