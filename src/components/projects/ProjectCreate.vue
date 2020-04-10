<template>
  <div id="projectsCreate">
    <div id="backToProjects">
      <router-link id="backToProjectsLink" to="/projects" tag="md-button">Back</router-link>
    </div>
    <form @submit.prevent="onProjectCreate">
      <fieldset>
        <h1>Create project</h1>

        <p class="field field-icon">
          <label for="title">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input
            v-model="title"
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
          <p v-if="!$v.title.required" class="error">Title is required!</p>
          <p
            v-else-if="!$v.title.minLength || !$v.title.maxLenght"
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
            v-model="amount"
            type="number"
            name="amount"
            id="amount"
            placeholder="Project amount"
            @blur="$v.amount.$touch"
            :class="$v.amount.$error? 'error':''"
          />
        </p>

        <!-- if error -->
        <template v-if="$v.amount.$error">
          <p v-if="!$v.amount.required" class="error">Amount is required!</p>
          <p v-else-if="!$v.amount.amount" class="error">Amount should be number!</p>
          <p v-else-if="!$v.amount.maxValue" class="error">Amount should be greater then ZERO!</p>
        </template>
        <!-- end if error -->

        <p class="field field-icon">
          <label for="imgUrl">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input
            v-model="imgUrl"
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="Project image"
            @blur="$v.imgUrl.$touch"
            :class="$v.imgUrl.$error? 'error':''"
          />
        </p>

        <template v-if="$v.imgUrl.$error">
          <p v-if="!$v.imgUrl.required" class="error">Image is required!</p>
          <p v-else-if="!$v.imgUrl.imgUrl" class="error">Image Url should start with 'http:/'!</p>
        </template>

        <p class="field field-icon">
          <label for="description">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <textarea
            v-model="description"
            name="description"
            id="description"
            placeholder="Project description"
            class="textarea"
            @blur="$v.description.$touch"
            :class="$v.description.$error? 'error':''"
          ></textarea>
        </p>

        <!-- if error -->
        <template v-if="$v.description.$error">
          <p v-if="!$v.description.required" class="error">Description is required!</p>
          <p
            v-else-if="!$v.description.minLength || !$v.description.maxLenght"
            class="error"
          >Description should be between 5 and 1500 symbols!</p>
        </template>
        <!-- end if error -->

        <p>
          <button :disabled="($v.$error)">Add Project</button>
        </p>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axiosDb from "@/axios-database";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { helpers } from "vuelidate/lib/validators";
const amount = helpers.regex("amount", /^[0-9]{1,9}$/);
const imgUrl = helpers.regex("imgUrl", /^https:\/+/);

const greaterThanZero = value => value > 0;

export default {
  mixins: [validationMixin],
  props: {
    isAuth: {
      type: Boolean,
      required: true
    }
  },
  name: "ProjectCreate",
  data: function() {
    return {
      title: "",
      amount: "",
      imgUrl: "",
      description: ""
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(3),
      maxLenght: maxLength(15)
    },
    amount: {
      required,
      amount,
      maxValue: greaterThanZero
    },
    imgUrl: {
      required,
      imgUrl
    },
    description: {
      required,
      minLength: minLength(5),
      maxLenght: maxLength(1500)
    }
  },
  methods: {
    onProjectCreate() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      console.log("Form was validated successfully!");

      const payload = {
        title: this.title,
        amount: this.amount,
        imgUrl: this.imgUrl,
        description: this.description
        //returnSecureToken: true
      };
      console.log(payload);
      // Project Settings -> Web API key
      axiosDb
        .post("projects.json", payload)
        .then(res => {
          //   const { idToken, localId } = res.data;

          //   localStorage.setItem("token", idToken);
          //   localStorage.setItem("userId", localId);
          console.log(res);
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
  cursor: pointer;
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
