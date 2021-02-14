<template>
  <nav>
    <v-app-bar flat app color="accent-4">
      <!-- <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon> -->

      <!-- change the image path according to your path -->
      <!-- <img src="/surojit/JIST/dist/logo.jpg" alt="" width="350" height="60"> -->
      <img src="/logo.jpg" alt="" width="350" height="60">
      <v-spacer></v-spacer>


      <v-card text flat class="d-inline-flex pa-2">
        <v-card-text>
          <div class="text--black">Welcome <span class="font-weight-bold">Admin</span></div>
        </v-card-text>
      </v-card>


      <v-btn text>
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
