<template>
  <div>
    <template v-if="isAuth && !isFetching">
    <!-- <div v-for="p in projects" :key="p.projectId"> -->
    <div  class="container left">
      <router-link to="/projects/create" tag="md-button">+ Add project</router-link>
      <!-- <md-button @click="create">+ Add project</md-button> -->
    </div>

    <div class="container">
      <md-card v-for="p in projects" :key="p.projectId">
        <md-card-area>
          <md-card-media>
            <img class="img-size" :src="p.imgUrl" />
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{p.title}}</div>
            <div class="md-subhead">{{p.projectId}}</div>
          </md-card-header>

          <md-card-content>{{p.descrition}}</md-card-content>
        </md-card-area>

        <md-card-actions md-alignment="left">
          <md-button @click="details">Details</md-button>
          <md-button @click="edit(p.projectId)">Edit</md-button>
          <md-button @click="deleteCard">Delete</md-button>
        </md-card-actions>
      </md-card>
    </div>

    <!-- </div> -->

    </template>
    <template v-else-if="isAuth && isFetching">
      
      <div>
        <Loading />
      </div>

    </template>
  </div>
  
</template>

<script>
import axiosDb from "@/axios-database";
import Loading from "../shared/Loading";

export default {
  props: {
    isAuth: {
      type: Boolean,
      required: true
    }
  },
  components:{Loading},
  name: "ProjectList",
  data: function() {
    return {
      projects: [],
      isFetching: true
    };
  },
  async beforeCreate() {
    this.$emit("onAuth", localStorage.getItem("token") !== null);
    await axiosDb
      .get(`projects.json`)
      .then(res => {
        const allProjectsRes = res.data;
        for (const projectId in allProjectsRes) {
          this.projects.push({
            projectId,
            ...allProjectsRes[projectId]
          });
        }
        this.isFetching = false;
      })
      .catch(err => {
        console.error(err);
      });
  },
  // async created() {
  //   await axiosDb
  //     .get(`projects.json`)
  //     .then(res => {
  //       const allProjectsRes = res.data;
  //       for (const projectId in allProjectsRes) {
  //         this.projects.push({
  //           projectId,
  //           ...allProjectsRes[projectId]
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // },

  methods: {
    create() {
      this.$router.push("/projects/create");
    },
    details() {
      window.alert("Send a message...");
    },
    edit(projectId) {
      this.$router.push("/projects/edit" + "/" + projectId);
    },
    deleteCard() {
      window.alert("Calling someone...");
    },
    getCreateUrl() {
      return "/projects/create";
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: block;
  margin-inline-start: 185px;
  width: 75%;
}
.left {
  display: block;
}
.img-size {
  height: 180px;
  width: 480px;
}
.card-expansion {
  height: 480px;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

.md-card-example {
  .md-subhead {
    .md-icon {
      $size: 16px;

      width: $size;
      min-width: $size;
      height: $size;
      font-size: $size !important;
    }

    span {
      vertical-align: middle;
    }
  }

  .card-reservation {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .md-icon {
      margin: 8px;
    }
  }

  .md-button-group {
    display: flex;

    .md-button {
      min-width: 60px;
      border-radius: 2px;
    }
  }
}
</style>


