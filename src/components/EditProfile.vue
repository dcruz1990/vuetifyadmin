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

          <v-progress-circular v-if="isTyping" indeterminate color="primary"></v-progress-circular>
          <v-card-text>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      @keydown = "isTyping = true"
                      v-debounce:400ms="handleUpdateProfile"
                      v-model="mylocaluser.username"
                      class="purple-input"
                      label="User Name"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                       @keydown = "isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.email"
                      label="Email Address"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                     @keydown = "isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.fullname"
                      label="Full Name"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                     @keydown = "isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.addres"
                      label="Adress"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                     @keydown = "isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.city"
                      label="City"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                     @keydown = "isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.country"
                      class="purple-input"
                      label="Country"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                     @keydown = "isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      class="purple-input"
                      label="About Me"
                      v-model="mylocaluser.aboutme"
                    />
                  </v-col>

                  <!-- <v-col cols="12" class="text-right">
                    <v-btn
                     v-debounce:300ms="handleUpdateProfile"
                      :loading="isLoading"
                      color="success"
                      class="mr-0"
                    >Update Profile</v-btn>
                  </v-col>-->
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
      changed: false,
      changedFields: [],
      isTyping: false
    };
  },
  beforeMount() {
    this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
  },
  beforeRouteLeave(to, from, next) {
    // this.$store.dispatch("updateUser", this.mylocaluser)
    next();
    // if (this.changed) {
    //   const answer = window.confirm(
    //     "Do you really want to leave? you have unsaved changes!, you have this fields changed:" +
    //       this.changedFields
    //   );
    //   if (answer) {
    //     next();
    //   } else {
    //     next(false);
    //   }
    // } else {
    //   next();
    // }
  },
  methods: {
    async handleUpdateProfile() {
      await this.$store.dispatch("updateUser", this.mylocaluser).then(() => {
        this.showSnackbar = true
        this.isTyping = false
      });
      
      this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
    }
    // changedFullname(value) {
    //   if (value !== this.user.fullname) {
    //     this.changed = true;
    //     this.changedFields.push("fullname");
    //   } else {
    //     this.changed = false;
    //     var op = this.changedFields.findIndex(function(element) {
    //       return element === value;
    //     });
    //     this.changedFields.splice(op, 1);
    //   }
    // }
  },
  computed: {
    ...mapState(["isLoading", "user"])
  }
  // // watch: {
  // //   mylocaluser: {
  // //     deep: true,
  // //     handler: function(nuevoValor, valorAnterior) {
  // //        console.log(
  // //         "El valor anterior era ",
  // //         valorAnterior,
  // //         " y ahora es",
  // //         nuevoValor
  // //       );
  // //       if (nuevoValor !== this.user) {
  // //         console.log("Los datos cambiaron!!! son diferentes");
  // //         this.changed = true
  // //       } else {
  // //         console.log("Los datos son iguales!");
  // //         this.changed = false
  // //       }
  // //     }
  // //   }
  // }
};
</script>