<template>
  <div id="grids">
      <div v-if="isAuth">
        Hello to the Grid List
        <p v-for="g in grids" :key="g.gridId">{{g.name}}</p>
      </div>
      <div v-else>
        Hello to the Project List (not authenticated)
      </div>
  </div>
</template>

<script>
import axiosDb from '@/axios-database';

export default {
  name: 'GridList',
  props: {
    isAuth: Boolean
  },
  data: function() {
    return {
      grids: []
    }
  },
  beforeCreate() {
    this.$emit('onAuth', localStorage.getItem('token') !== null);
  },
  created() {
    axiosDb.get(`grids.json`).then((res) => {
      const allGridsRes = res.data;
      for (const gridId in allGridsRes) {
        this.grids.push({
          gridId,
          ...allGridsRes[gridId]
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
