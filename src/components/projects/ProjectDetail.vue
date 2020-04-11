<template>
  <div id="projectDetail" >
    <template v-if="isAuth && !isFetching">
      <div id="backToProjects" >
        <router-link id="backToProjectsLink" to="/projects" tag="md-button" class="button">Back</router-link>
      </div>
      <div class="container">
        <div class="content ">
            
            <div ><img :src="project.imgUrl"/></div>
            <div>
                <h1>{{project.title}}</h1>
                <p >Total amount: {{project.amount}} euro</p>
                <hr class="hrClass">
            </div>
             
            <div class="pClass">{{project.description}}</div>
            
        </div>
       <hr >
      </div>
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
  components: { Loading },
  name: "ProjectDetail",
  data: function() {
    return {
      project: {
        // projectId: "",
        title: "",
        amount: 0,
        imgUrl: "",
        description: ""
      },
      isFetching: true
      
    };
  },
  
  beforeCreate() {
    this.$emit("onAuth", localStorage.getItem("token") !== null);
    const id = this.$route.params.id;
    console.log(id);
    axiosDb
      .get(`projects/${id}.json`)
      .then(res => {
        const projectsRes = res.data;
        //TODO refactor this
        // for (const projectId in projectsRes) {
        //   if (id === projectId) {
            projectsRes.amount = Number(projectsRes.amount);
            this.project = projectsRes ;
            
        //   }
        // }
        this.isFetching = false;
        
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
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

.container {
  font-family: inherit;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  text-align: center;
  
}
.hrClass{
    border: 0;
    border-top: 1px solid lightblue;
    margin-bottom: 20px;
    margin-top: 20px;
}
.pClass {
    
    text-align: justify;
    
}
.content{
    display: flex;
  flex-direction: column;
width: 50%;
}
.button {
    
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.8em 1.2em;
  width: 50%;
  cursor: pointer;
}

#backToProjects {
  padding-top: 10px;
  display: block;
  justify-content: center;
  padding-inline-start: 328px;
}
.md-button {
  width: 150px;
  border-radius: 2px;
  background-color: whitesmoke;
}
</style>
