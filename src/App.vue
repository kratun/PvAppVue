<template>

  <div id="app">
    
    <Header @onAuth="isAuth = $event" :isAuth="isAuth" />
      <router-view @onAuth="isAuth = $event" :isAuth="isAuth" :isAdmin="isAdmin" @onAdmin="isAdmin = $event"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import {ADMIN_KEY} from './secrets/ApiSecret'

export default {
  name: 'App',
  data: function() {
    return {
      isAuth: localStorage.getItem('token') !== null,
      isAdmin: localStorage.getItem('userId') === ADMIN_KEY,
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style>

</style>
