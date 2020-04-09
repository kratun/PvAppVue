<template>
  <div id="home">
      <div v-if="isAuth">
        Hello to the Page (authenticated)
        <div v-for="p in projects" :key="p.projectId">
          <p>
            {{p.title}}
          </p>
          <div>
            <img :src="p.imgUrl"/>
          </div>
        </div>
      </div>
      <div v-else>
        Hello to the Page (not authenticated)
      </div>
  </div>
</template>

<script>
import axiosDb from '@/axios-database';

export default {
  name: 'Home',
  props: {
    isAuth: Boolean
  },
  data: function() {
    return {
      projects: []
    }
  },
  beforeCreate() {
    this.$emit('onAuth', localStorage.getItem('token') !== null);
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
}
</script>

<style>

</style>
