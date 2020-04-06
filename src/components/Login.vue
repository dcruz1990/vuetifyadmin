<template>
  <v-card color="grey lighten-4" elevation="6" shaped>
    <v-card-title class="title">Login</v-card-title>
    <v-card-subtitle class="subtitle">

        <v-col >Please, log in with your email and password</v-col>

    </v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid">
        <v-container>
          <v-row v-if="error.errorFlag" >
            <v-col >
              <v-alert @input = "alertClosed" type="error" dismissible>{{ error.errorType }}</v-alert>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col offset="2" lg="8" md="6" >
              <v-text-field v-model="auth.email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col  offset="2" lg="8" md="6" >
              <v-text-field
                v-model="auth.password"
                :rules="passwordRules"
                label="Password"
                required
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col offset="2" lg="8" md="6" >
              <v-btn
                @click.prevent="login"
                :loading="isLoading"
                :disabled="!valid"
                color="blue"
              >Login</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { isAuthenticated } from "@/services/AuthService"
import router from '@/router/index'

export default {
  name: "Login",
  props: {
    redirectErr: String
  },
  data: () => ({
    auth: { email: "", password: "" },
    valid: false,
    err: {
        flag: false,
        type: ""
    },
    passwordRules: [v => !!v || "Password is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  beforeMount() {
    if (isAuthenticated()) {
      
      router.push('/home')
    } else {
      console.log("identificate por favor")
    }     
    // this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
  },
  computed: {
    ...mapState(["isLoading", "error"]),
    ...mapMutations(["setError", "setIsAuthenticate"]),

    
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store.dispatch("Login", this.auth);
        if (this.error.errorFlag) {
          this.auth.password = "";
          this.auth.email = "";
        }
      } else {
        this.myerror = true;
      }
    },
    alertClosed() {
        this.$store.dispatch("setErr", this.err)
    }
  },
    
};
</script>