<template>
  <v-row align="center">
    <v-col lg="4" offset-lg="4" md="8" offset-md="2" sm="8" offset-sm="2" >
      <Login v-if="!isAuthenticated" />
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
  computed: {
    ...mapState(["isAuthenticated"])
  }
};
</script>