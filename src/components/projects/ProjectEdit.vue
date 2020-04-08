<template>
  <div id="projectsCreate">
    <form @submit.prevent="onProjectEdit">
      <fieldset>
        <h1>Edit project</h1>
        <h1>{{project.projectId}}</h1>
        <p class="field field-icon">
          <label for="title">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input
            v-model="project.title"
            type="text"
            name="title"
            id="title"
            placeholder="Project title"
          />
        </p>

        <p class="field field-icon">
          <label for="amount">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input
            v-model="project.amount"
            type="number"
            name="amount"
            id="amount"
            placeholder="Project amount"
          />
        </p>

        <p class="field field-icon">
          <label for="imgUrl">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input
            v-model="project.imgUrl"
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="Project image"
          />
        </p>

        <p class="field field-icon">
          <label for="description">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <textarea
            v-model="project.description"
            name="description"
            id="description"
            placeholder="Project description"
          ></textarea>
        </p>

        <p>
          <button>Add Project</button>
        </p>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axiosDb from "@/axios-database";

export default {
  props: {
    isAuth: Boolean
  },
  name: "ProjectEdit",
  data: function() {
    return {
      project: {
        projectId: "",
        title: "",
        amount: "",
        imgUrl: "",
        description: ""
      },
    //   projectId: "",
    //     title: "",
    //     amount: "",
    //     imgUrl: "",
    //     description: ""
    };
  },
  beforeCreate() {
    this.$emit("onAuth", localStorage.getItem("token") !== null);
    const id = this.$route.params.id;
    //const json = `projects.json?orderBy="$key"&startAt="${projectId}"&endAt=""&print=pretty`
    console.log(id);
    axiosDb
      .get(`projects.json`)
      .then(res => {
        const projectsRes = res.data;
        for (const projectId in projectsRes) {
            
          if (id === projectId) {
            //       this.projectId = id;
            // //[this.title, this.amount, this.imgUrl, this.description] = [...projectsRes[projectId]];
            // this.title = projectsRes[id].title;
            // this.amount = projectsRes[id].amount;
            // this.imgUrl = projectsRes[id].imgUrl;
            // this.description = projectsRes[id].description;
            this.project = { projectId, ...projectsRes[projectId] };
          }
        }
        console.log(projectsRes);
      })
      .catch(err => {
        console.error(err);
      });
    console.log(this.project);
  },

  methods: {
    onProjectEdit() {
      // const payload = 
      // {
      //     title:this.project.title,
      //     amount:this.project.amount,
      //     imgUrl:this.project.imgUrl,
      //     description:this.project.description
      // };
      // //   {
      // //     projectId: {
      // //         title:this.title,
      // //       amount:this.amount,
      // //       imgUrl:this.imgUrl,
      // //       description:this.description
      // //     //   title:this.project.title,
      // //     //   amount:this.project.amount,
      // //     //   imgUrl:this.project.imgUrl,
      // //     //   description:this.project.description
      // //     }
      // //   };

      // console.log(payload);
      // // Project Settings -> Web API key
      // axiosDb
      //   .put(`projects/${this.project.projectId}.json`, payload)
      //   .then(res => {
      //     //   const { idToken, localId } = res.data;

      //     //   localStorage.setItem("token", idToken);
      //     //   localStorage.setItem("userId", localId);
      //     console.log(res);
      //     this.$router.push("/projects");
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
form {
  margin-top: 20px;
  margin: 20px auto;
  width: 40%;
}

fieldset {
  border-radius: 10px;
  padding: 20px;
}

input {
  flex: 0 1 100%;
  border: 1px solid;
  padding: 5px;
  border-left: 3px solid #42a948;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

select {
  border-color: black;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.8em 1.2em;
  width: 100%;
}

i {
  border: 1px solid;
  border-right: none;
  padding: 10px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: #e9ecef;
}

a {
  color: #007bff;
}

.container {
  font-family: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.tel {
  padding-right: 20px;
}

.building {
  flex: 1 1 100%;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

form .field {
  display: flex;
}

/* if error */

p.error {
  text-align: left;
  background-color: #f8d7da;
  padding: 8px;
  border-radius: 3px;
}

input.error {
  border-left-color: #a8413f;
}
</style>
