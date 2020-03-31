<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-snackbar color="success" v-model="showSnackbar" :timeout="2500" right>
        Profile updated succefuly!!!
        <v-btn color="black" text dark @click="showSnackbar = false" small>Close</v-btn>
      </v-snackbar>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Edit {{ mylocaluser.username }}' profile:</v-card-title>

          <v-card-text>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      @change="changedFlag"
                      v-model="mylocaluser.username"
                      class="purple-input"
                      label="User Name"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="mylocaluser.email"
                      label="Email Address"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="mylocaluser.fullname"
                      label="Full Name"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="mylocaluser.addres" label="Adress" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field v-model="mylocaluser.city" label="City" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="mylocaluser.country"
                      class="purple-input"
                      label="Country"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      class="purple-input"
                      label="About Me"
                      v-model="mylocaluser.aboutme"
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn
                      @click="handleUpdateProfile"
                      :loading="isLoading"
                      color="success"
                      class="mr-0"
                    >Update Profile</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card-text class="text-center">
          <v-avatar color="orange" size="150">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" aspect-ratio="1.7"></v-img>
          </v-avatar>

          <h6 class="display-1 mb-1 grey--text">FULL STACK DEVELOPER</h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">{{ mylocaluser.fullname}}</h4>

          <p class="font-weight-light grey--text">{{mylocaluser.aboutme }}</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "EditProfile",
  data() {
    return {
      mylocaluser: {},
      showSnackbar: false,
      changed: false
    };
  },
  beforeMount() {
    this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    async handleUpdateProfile() {
      await this.$store.dispatch("updateUser", this.mylocaluser).then(() => {
        this.showSnackbar = true;
      });

      this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
    },
    changedFlag() {
      this.changed = true;
    }
  },
  computed: {
    ...mapState(["isLoading", "user"])
  },
  watch: {
    mylocaluser: {
      deep: true,
      handler: function(nuevoValor, valorAnterior) {
        console.log(
          "El valor anterior era ",
          valorAnterior,
          " y ahora es",
          nuevoValor
        );
        if (nuevoValor !== this.user) {
          console.log("Los datos cambiaron!!! son diferentes");
        } else {
          console.log("Los datos son iguales!");
        }
      }
    }
  }
  // watch: {
  //   mylocaluser: {
  //     handler: function(val, oldVal) {
  //       if (this.mylocaluser !== this.user) {
  //         console.log("datos diferentes");
  //         this.changedFlag = true;
  //       } else {
  //         this.changedFlag = false;
  //       }
  //     },
  //     deep: true
  //   }
  // }
};
</script>