<template>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/projects">Projects</router-link>
      </li>
      
      
      <span>
        <li v-if="!isAuth" class="right">
          <router-link to="/sign-up">Sign Up</router-link>
        </li>
        <li v-if="!isAuth" class="right">
          <router-link to="/sign-in">Login</router-link>
        </li>

        <li v-if="isAuth" class="right">
          <a @click="onLogout" class="logout" type="submit">Logout</a>
        </li>
      </span>
    </ul>
  </nav>
</template>

<script>
import userStore from "@/store/userStore/userStore";
export default {
  props: {
    isAuth: Boolean
  },
  name: "Header",
  methods: {
    onLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      userStore.clearUser();
      this.$emit("onAuth", false);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(10, 63, 207);
}
.whiteColor{
  color:white;
}
.right{
  float:right;
  

}
li {
  float:left;
}

li a {
  display: block;
  color:white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}

.logout {
  cursor: pointer;
}
</style>
