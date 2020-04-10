<template>
  <div id="projectsEdit">
    <template v-if="isAuth && !isFetching">
      <div id="backToProjects" class="button">
        <router-link id="backToProjectsLink" to="/projects" tag="md-button">Back</router-link>
      </div>
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
              @blur="$v.title.$touch"
              :class="$v.title.$error? 'error':''"
            />
          </p>

          <!-- if error -->
          <template v-if="$v.title.$error">
            <!-- <p v-if="!$v.title.required" class="error">Title is required!</p> -->
            <p
              v-if="!$v.title.minLength || !$v.title.maxLenght"
              class="error"
            >Title should be between 3 and 15 symbols!</p>
          </template>
        <!-- end if error -->

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
              min="1"
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
              @blur="$v.imgUrl.$touch"
              :class="$v.imgUrl.$error? 'error':''"
            />
          </p>

          <template v-if="$v.imgUrl.$error">
          <!-- <p v-if="!$v.imgUrl.required" class="error">Image is required!</p> -->
          <p v-if="!$v.imgUrl.imgUrl" class="error">Image Url should start with 'http:/'!</p>
        </template>

          <p class="field field-icon">
            <label for="description">
              <span>
                <i class="fas fa-user"></i>
              </span>
            </label>
            <textarea
              class="textarea"
              v-model="project.description"
              name="description"
              id="description"
              placeholder="Project description"
              @blur="$v.description.$touch"
              :class="$v.description.$error? 'error':''"
            ></textarea>
          </p>

          <!-- if error -->
          <template v-if="$v.description.$error">
            <p
              v-if="!$v.description.minLength || !$v.description.maxLenght"
              class="error"
            >Description should be between 5 and 1500 symbols!</p>
          </template>
        <!-- end if error -->

          <p>
            <button :disabled="($v.$error)">Add Project</button>
          </p>
        </fieldset>
      </form>
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

import { validationMixin } from "vuelidate";
import { minLength, maxLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";

import Loading from "../shared/Loading";
const imgUrl = helpers.regex("imgUrl", /^https:\/+/);



export default {
  mixins: [validationMixin],
  props: {
    isAuth: {
      type: Boolean,
      required: true
    }
  },
  components: { Loading },
  name: "ProjectEdit",
  data: function() {
    return {
      project: {
        projectId: "",
        title: "",
        amount: 0,
        imgUrl: "",
        description: ""
      },
      isFetching: true
      
    };
  },
  validations: {
    title: {
      minLength: minLength(3),
      maxLenght: maxLength(15)
    },
    imgUrl: {
      imgUrl
    },
    description: {
      minLength: minLength(5),
      maxLenght: maxLength(1500)
    }
  },
  beforeCreate() {
    this.$emit("onAuth", localStorage.getItem("token") !== null);
    const id = this.$route.params.id;
    
    axiosDb
      .get(`projects.json`)
      .then(res => {
        const projectsRes = res.data;
        //TODO refactor this
        for (const projectId in projectsRes) {
          if (id === projectId) {
            console.log(projectsRes[projectId].amount+1)
            projectsRes[projectId].amount = Number(projectsRes[projectId].amount);
            console.log(projectsRes[projectId].amount+1)
            this.project = { projectId, ...projectsRes[projectId] };
            this.$nextTick(() => { this.$v.$reset() })
          }
        }
        this.isFetching = false;
        
      })
      .catch(err => {
        console.error(err);
      });
  },

  methods: {
    onProjectEdit() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      console.log("EditForm was validated successfully!");
      const payload = {
        title: this.project.title,
        amount: Number(this.project.amount),
        imgUrl: this.project.imgUrl,
        description: this.project.description
      };

      const id = this.$route.params.id;
      // TODO: If Id is null
      axiosDb
        .put(`projects/${id}.json`, payload)
        .then(() => {
          this.$router.push("/projects");
        })
        .catch(err => {
          console.error(err);
        });
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
#backToProjects {
  padding-top: 10px;
  padding-inline-start: 400px;
}
.md-button {
  width: 150px;
  border-radius: 2px;
  background-color: whitesmoke;
}
.textarea {
  width: 100%;
  height: 100px;
}
</style>
