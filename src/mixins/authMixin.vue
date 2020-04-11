<script>
import authAxios from "@/axios-auth";

export default {
  //   props: {
  //     text: {
  //       type: String,
  //       required: true
  //     }
  //   },
  data() {
    return {
      test2: "Test2",
      user: null
    };
  },
  computed: {
    textLength() {
      return this.text.length;
    }
  },
  methods: {
    login(payload) {
      authAxios
        .post("/accounts:signInWithPassword", payload)
        .then(res => {
          const { idToken, localId } = res.data;
         
          localStorage.setItem("token", idToken);
          localStorage.setItem("userId", localId);
          this.user = {
            token: idToken,
            userId: localId
          };
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    },
    register(payload) {
      authAxios
        .post("/accounts:signUp", payload)
        .then(res => {
          const { idToken, localId } = res.data;

          localStorage.setItem("token", idToken);
          localStorage.setItem("userId", localId);

          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    },
    logout() {
      setTimeout(() => {
        this.user = null;
      }, 3000);
    }
  }
};
</script>

