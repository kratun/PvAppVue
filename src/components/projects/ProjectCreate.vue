<template>
  <div id="projectsCreate">
    <form @submit.prevent="onProjectCreate">
      <fieldset>
        <h1>Create project</h1>

        <p class="field field-icon">
          <label for="title">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input v-model="title" type="text" name="title" id="title" placeholder="Project title" />
        </p>

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
          />
        </p>

        <p class="field field-icon">
          <label for="imgUrl">
            <span>
              <i class="fas fa-user"></i>
            </span>
          </label>
          <input v-model="imgUrl" type="text" name="imgUrl" id="imgUrl" placeholder="Project image" />
        </p>

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
import dbAxios from "@/axios-database";

export default {
  name: "ProjectCreate",
  data: function() {
    return {
      title: "",
      amount: "",
      imgUrl: "",
      description: ""
    };
  },
  methods: {
    onProjectCreate() {
      const payload = {
        title: this.title,
        amount: this.amount,
        imgUrl: this.imgUrl,
        description: this.description,
        //returnSecureToken: true
      };
      console.log(payload);
      // Project Settings -> Web API key
      dbAxios
        .post("projects.json", payload)
        .then(res => {
          //   const { idToken, localId } = res.data;

          //   localStorage.setItem("token", idToken);
          //   localStorage.setItem("userId", localId);
          console.log(res);
          this.$router.push("/");
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
</style>
