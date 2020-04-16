<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-if="isAuthenticated" v-model="drawer" app right>
        <v-list dense>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-snackbar color="info" v-model="showSnackbar" :timeout="3000" right>
        We are already there :D
        <v-btn color="black" text dark @click="showSnackbar = false" small>Close</v-btn>
      </v-snackbar>

      <v-app-bar app color="blue" dark>
        <!-- <v-spacer /> -->

        <v-toolbar-title>
          <span @click.prevent="goHome">Coding In DFW Dashboard</span>
        </v-toolbar-title>
        <v-spacer />
        <span v-if="isAuthenticated">{{ user.fullName }}</span>

        <v-menu bottom left v-if="isAuthenticated" open-on-hover>
          <template v-slot:activator="{ on }">
            <v-avatar size="40" v-on="on">
              <img class="pointer" src="@/assets/logo.png" alt="User Photo" />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item key="editprofile" @click.prevent="handleEditProfileRouterLink">
              <v-list-item-title>
                <v-icon left medium color="blue darken-2">mdi-account</v-icon>
                <span>Edit Profile</span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item key="addpost">
              <v-list-item-title>
                <v-icon left medium color="blue darken-2">mdi-plus-circle</v-icon>
                <span>Create post</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item key="addproduct" @click.prevent="handleEditProfile">
              <v-list-item-title>
                <v-icon left medium color="blue darken-2">mdi-briefcase</v-icon>
                <span>Add product</span>
              </v-list-item-title>
            </v-list-item>
            <v-list-item key="logout" @click.prevent="exit">
              <v-list-item-title>
                <v-icon left medium color="blue darken-2">mdi-exit-to-app</v-icon>
                <span>Logout</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="drawer = !drawer" />
      </v-app-bar>

      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col class="text-center" align-self="center">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </v-content>

      <v-footer color="blue" app>
        <v-spacer />
        <span class="white--text">&copy; 2020</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import router from "@/router/index";

import { userService } from "@/_services";

export default {
  data: () => ({
    drawer: false,
    showSnackbar: false
  }),
  methods: {
    handleEditProfileRouterLink() {
      router.push("editprofile").catch(err => {
        this.showSnackbar = true;
      });
    },
    goHome() {
      router.push("/home").catch(err => {
        this.showSnackbar = true;
      });
    },
    exit() {
      userService.logout();
      location.reload(true);
    }
  },
  computed: {
    ...mapState(["isAuthenticated", "user"]),
    ...mapGetters(["UserMainPhoto"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.pointer {
  cursor: pointer;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
