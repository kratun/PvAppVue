<template>
  <div id="home">
    
    <div class="center">
      <img
        src="https://nencom.com/f/portfolio/houses/2019-04-varna/installation-trina-solar-modules-03.jpg"
      />
    </div>
    <div >
    <md-empty-state
      md-label="PV is the future ..."
      md-description="We will create your project and make you free."
    >
      <!-- <md-button class="md-primary md-raised">Create first project</md-button> -->
    </md-empty-state>
    </div>
  </div>
</template>

<script>
// import axiosDb from '@/axios-database';
import {ADMIN_KEY} from '../secrets/ApiSecret'

export default {
  name: "Home",
  beforeCreate() {
    this.$emit('onAuth', localStorage.getItem('token') !== null);
    this.$emit('onAdmin', localStorage.getItem('userId') === ADMIN_KEY);
  },
};
</script>

<style scoped>
.center{
  margin-top: 10px;
  
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 74%;
  height: 406px;
 
}

</style>
