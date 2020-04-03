<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-snackbar color="success" v-model="showSnackbar" :timeout="2500" right>
        Profile updated succefuly!!!
        <v-btn color="black" text dark @click="showSnackbar = false" small>Close</v-btn>
      </v-snackbar>

      <v-col cols="12" md="8">
        <v-alert
          transition="scale-transition"
          dismissible
          border="top"
          colored-border
          type="info"
          elevation="2"
        >To update profile you just have to type on the fields, the update occur when you stop typing.</v-alert>
        <v-card>
          <v-card-title>Edit {{ mylocaluser.username }}' profile:</v-card-title>

          <v-progress-circular v-if="isTyping" indeterminate color="primary"></v-progress-circular>
          <v-card-text>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:400ms="handleUpdateProfile"
                      v-model="mylocaluser.username"
                      class="purple-input"
                      label="User Name"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.email"
                      label="Email Address"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.fullname"
                      label="Full Name"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.addres"
                      label="Adress"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.city"
                      label="City"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.country"
                      class="purple-input"
                      label="Country"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      @keydown="isTyping = true"
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
          <v-avatar @click="test" color="orange" size="150">
            <v-img src="mylocaluser.photos[0].url" aspect-ratio="1.7"></v-img>
          </v-avatar>
          <v-col>
            <v-dialog v-model="ChangeProfilePicDialog" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on">Select Profile Pic</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Select profile pic:</v-card-title>
                <v-card-text>
                  Select a photo or upload a new one:
                  <v-row>
                    <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
                      <v-card flat tile class="d-flex">
                        <v-img
                          :src="mylocaluser.photos[0].url"
                          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                          aspect-ratio="1"
                          class="grey lighten-2"
                        >
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="ChangeProfilePicDialog = false">Cancel</v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="ChangeProfilePicDialog = false"
                  >Update pic</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <h6 class="display-1 mb-1 grey--text">FULL STACK DEVELOPER</h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">{{ mylocaluser.fullname}}</h4>

          <p class="font-weight-light grey--text">{{mylocaluser.aboutme }}</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "EditProfile",
  data() {
    return {
      mylocaluser: {},
      showSnackbar: false,
      changed: false,
      changedFields: [],
      isTyping: false,
      ChangeProfilePicDialog: false
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
        this.showSnackbar = true;
        this.isTyping = false;
      });

      this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
    },
    test() {
      console.log("hovered");
    }
  },
  computed: {
    ...mapState(["isLoading", "user"]),
    ...mapGetters(["UserMainPhoto"])
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