<template>
  <v-card color="grey lighten-4" elevation="6" shaped>
    <v-card-title class="title">Login</v-card-title>
    <v-card-subtitle class="subtitle">

        <v-col >Please, log in with your email and password</v-col>

    </v-card-subtitle>
    <v-card-text>
      <v-form v-model="valid">
        <v-container>
          <v-row v-show="error.errorFlag" >
            <v-col >
              <v-alert type="error" dismissible>{{ error.errorType }}</v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col >
              <v-text-field v-model="auth.email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col >
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
            <v-col >
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
import { mapState } from "vuex";

export default {
  name: "Login",
  data: () => ({
    auth: { email: "", password: "" },
    valid: false,
    passwordRules: [v => !!v || "Password is required"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  computed: {
    ...mapState(["isLoading", "error"])
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
    }
  }
};
</script>