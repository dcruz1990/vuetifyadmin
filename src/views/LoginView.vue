<template>
  <v-row align="center">
    <v-col lg="4" offset-lg="4" md="8" offset-md="2" sm="8" offset-sm="2">
      <Login :redirectErr="errorMsg" v-if="!isAuthenticated" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import Login from "@/components/Login";
export default {
  name: "LoginView",
  components: {
    Login
  },
  data() {
    return {
      errorMsg: null
    };
  },
  computed: {
    ...mapState(["isAuthenticated"])
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.redirectFrom) {
      next(vm => {
        let err = {
          flag: true,
          type: "Sorry, you don't have the right access to reach the route requested"  
        }
        vm.$store.dispatch("setErr", err);
      });
    } else {
      next();
    }
    // if (to.query.redirectFrom) {
    //   next(err => {
    //     console.log(err)
    //   })
    // } else {
    //   next()
    // }
  }
};
</script>