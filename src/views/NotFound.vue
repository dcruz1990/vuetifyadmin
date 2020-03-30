<template>
  <v-container>
      <h1>Sorry, that page doesnt Exist!!!</h1>
    <v-icon x-large color="blue darken-2">mdi-emoticon-sad</v-icon>
    <v-spacer></v-spacer>
    <v-btn @click="goHome" color="blue" class="mr-0">Go Home</v-btn>
  </v-container>
</template>
<script>
import router from '@/router/index'
export default {
  name: "NotFound",
  methods: {
      goHome: () => {
          router.push('/')
      }
  }
};
</script>