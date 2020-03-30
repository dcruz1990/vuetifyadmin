<template>
  <v-container id="user-profile" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Edit Profile {{ user.username }}</v-card-title>

          <v-card-text>
            <v-form >
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field :value = "user.username" class="purple-input" label="User Name" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field label="Email Address" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field label="Full Name" class="purple-input" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field label="Adress" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field label="City" class="purple-input" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field label="Country" class="purple-input" />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      class="purple-input"
                      label="About Me"
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn @click="handleUpdateProfile" color="success" class="mr-0">Update Profile</v-btn>
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
  data() {
    return {
      test: {
        username: String
      }
    }
  },
  methods: {
    handleUpdateProfile() {
      console.log("update profile clicked");
    }
  },
  computed: {
   ...mapState(["user"])
  }
  
};
</script>