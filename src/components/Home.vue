<template>
  <div id="home">
      <div>
        Hello to the Page ({{isAuth}}) is admin {{isAdmin}}
        <template v-if="isAuth && isAdmin">
           <div  v-for="p in projects" :key="p.projectId">
          <p>
            {{p.title}}
          </p>
          <div>
            <img :src="p.imgUrl"/>
          </div>
        </div>
        </template>
       
      </div>
      
  </div>
</template>

<script>
import axiosDb from '@/axios-database';
import {ADMIN_KEY} from '../secrets/ApiSecret'


export default {
  name: 'Home',
  props: {
    isAuth: {
      type: Boolean,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
  },
  data: function() {
    return {
      projects: [],
      
    }
  },
  beforeCreate() {
    this.$emit('onAuth', localStorage.getItem('token') !== null);
    this.$emit('onAdmin', localStorage.getItem('userId') === ADMIN_KEY);
  },
  async created() {
    await axiosDb.get(`projects.json`).then((res) => {
      const allProjectsRes = res.data;
      for (const projectId in allProjectsRes) {
        this.projects.push({
          projectId,
          ...allProjectsRes[projectId]
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  }
  // computed:{
    
  // }
}
</script>

<style>

</style>
