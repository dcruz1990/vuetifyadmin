<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-snackbar
      color="success"
      v-model = "showSnackbar"
      :timeout="2500"
      right
          >
      Profile updated succefuly!!!
      <v-btn
        color="black"
        text
        dark
        @click="showSnackbar = false"
        small
      >Close
        
      </v-btn>
    </v-snackbar>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Edit {{ mylocaluser.username }}' profile  </v-card-title>

          <v-card-text>
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model = "mylocaluser.username" class="purple-input" label="User Name" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field v-model = "mylocaluser.email" label="Email Address" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field v-model = "mylocaluser.fullname" label="Full Name" class="purple-input" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model = "mylocaluser.addres" label="Adress" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field v-model = "mylocaluser.city" label="City" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field v-model = "mylocaluser.country" class="purple-input" />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      class="purple-input"
                      label="About Me"
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn @click="handleUpdateProfile" :loading = "isLoading" color="success" class="mr-0">Update Profile</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card-text class="text-center">
          <h6 class="display-1 mb-1 grey--text">CEO / CO-FOUNDER</h6>

          <h4 class="display-2 font-weight-light mb-3 black--text">Alec Thompson</h4>

          <p
            class="font-weight-light grey--text"
          >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "EditProfile",
  data () {
    return {
      mylocaluser: null,
      showSnackbar: false
    }
  },
  beforeMount () {
    this.mylocaluser = JSON.parse ( JSON.stringify ( this.$store.state.user) )
  },
  methods: {
    async handleUpdateProfile() {
      await this.$store.dispatch("updateUser", this.mylocaluser).then(() => {
        this.showSnackbar = true
      })
      
      this.mylocaluser = JSON.parse ( JSON.stringify ( this.$store.state.user) )
    }
  },
  computed: {
    ...mapState(["isLoading"])
  },

};
</script>