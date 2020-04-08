<script>
import axios from "axios";
import axiosDb from "@/axios-database";

const API_URL = "http://localhost:8080";

export default {
  name: "ProjectService",
  data() {
    return {
      projects: []
    };
  },
  methods: {
    getProjects() {
      const url = `${API_URL}/api/contacts/`;
      return axios.get(url).then(response => response.data);

      axiosDb
        .get(`projects.json`)
        .then(res => {
          const allProjectsRes = res.data;
          for (const projectId in allProjectsRes) {
            this.projects.push({
              projectId,
              ...allProjectsRes[projectId]
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

