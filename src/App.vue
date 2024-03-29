<template>
  <v-app theme="dark">
    <router-view to="/login"></router-view>
    <Nav-bar :class="autenticado ? 'visivel' : 'invisivel'" />

    <v-main>
      <v-container>
        <!--<router-view></router-view>-->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/nav/NavBar";

export default {
  components: { NavBar },
  name: "App",

  data: () => ({
    autenticado: false,
  }),
};
</script>
<style>
.invisivel {
  display: none;
}
</style>
