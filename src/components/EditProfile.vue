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
                      v-debounce:300ms="handleUpdateProfile"
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
                      v-model="mylocaluser.fullName"
                      label="Full Name"
                      class="purple-input"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.phone"
                      class="purple-input"
                      label="Phone number"
                    />
                  </v-col>

                  <!-- <v-col cols="12">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.user.addres"
                      label="Adress"
                      class="purple-input"
                    />
                  </v-col> -->

                  <!-- <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.city"
                      label="City"
                      class="purple-input"
                    />
                  </v-col> -->

                  <!-- <v-col cols="12" md="4">
                    <v-text-field
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      v-model="mylocaluser.country"
                      class="purple-input"
                      label="Country"
                    />
                  </v-col> -->

                  <!-- <v-col cols="12">
                    <v-textarea
                      @keydown="isTyping = true"
                      v-debounce:300ms="handleUpdateProfile"
                      class="purple-input"
                      label="About Me"
                      v-model="mylocaluser.aboutme"
                    />
                  </v-col> -->
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card-text class="text-center">
          <v-avatar color="orange" size="150">
            <v-img lazy-src="@/assets/logo.png"  aspect-ratio="1.7"></v-img>
            <!-- :src="UserMainPhoto[0].url" -->
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
                     <!-- v-for="(photo, index) in getAlluserPhotos" -->
                     <!-- :key="photo.id" -->
                    <v-col
                     
                      
                      class="d-flex child-flex"
                      cols="4"
                    >
                      <v-card flat tile class="d-flex">
                        <!-- :src="photo.url" -->
                        <!-- @click="setMainProfilePic(index)" -->
                        <v-img
                          
                          
                          lazy-src="https://picsum.photos/10/6"
                          aspect-ratio="1"
                          class="grey lighten-2"
                        >
                          <!-- <p v-if="photo.main">In use</p> -->
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera"
                        label="Avatar"
                      ></v-file-input>

                      <v-btn color="green darken-1" text>Upload New</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="ChangeProfilePicDialog = false">Done</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <h6 class="display-1 mb-1 grey--text">FULL STACK DEVELOPER</h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">{{ mylocaluser.fullName}}</h4>

          <!-- <p class="font-weight-light grey--text">{{mylocaluser.aboutme }}</p> -->
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { isAuthenticated, getUserData } from '@/services/AuthService'
import router from '@/router/index'
export default {
  name: "EditProfile",
  data() {
    return {
      mylocaluser: {},
      showSnackbar: false,
      changed: false,
      isTyping: false,
      ChangeProfilePicDialog: false
    };
  },
  mounted () {
    console.log("esto ocurre cuando se monta")
  },
  beforeMount() {
    if (!isAuthenticated) {
      console.log('no esta authenticado')
    } else {
     getUserData('1').then(response => {
       console.log(response.data)
       let userdata = response.data
       this.setUserStatus(userdata)
       this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user)); 
     })

    } 
    
    // this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
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
    // ...mapActions(["setMainProfilePic"]),
    ...mapMutations(["setUserStatus"]),
    async handleUpdateProfile() {
      await this.$store.dispatch("updateUser", this.mylocaluser).then(() => {
        this.showSnackbar = true;
        this.isTyping = false;
      });

      this.mylocaluser = JSON.parse(JSON.stringify(this.$store.state.user));
    },
    test() {
      // console.log(this.getAlluserPhotos[1]);
    },
    // changeUserProfile() {
    //   this.$store.dispatch;
    // }
  },
  computed: {
    ...mapState(["isLoading", "user"]),
    // ...mapGetters(["UserMainPhoto", "getAlluserPhotos"])
  }
};
</script>