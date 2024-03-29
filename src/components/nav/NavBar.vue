<template>
  <v-container>
    <v-navigation-drawer v-model="isDrawerOpen">
      <v-list>
        <v-list-item
          ><v-img
            :width="100"
            class="ml-10"
            cover
            src="../../assets/logo.png"
          ></v-img
        ></v-list-item>

        <v-list-item to="socios" prepend-icon="mdi-account-heart-outline"
          >Socios</v-list-item
        >
        <v-list-item to="/qoutas" prepend-icon="mdi-account"
          >pagamentos de contas</v-list-item
        >
        <v-list-item to="/usuarios" prepend-icon="mdi-account"
          >Usuarios</v-list-item
        >
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="border-b">
      <v-app-bar-nav-icon
        @click="isDrawerOpen = !isDrawerOpen"
      ></v-app-bar-nav-icon>
      <v-app-bar-title> União Desportiva do Zimpeto</v-app-bar-title>

      <template #append>
        <span>Yuran langa</span
        ><v-avatar color="info" class="ml-3">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
      </template>
    </v-app-bar>
  </v-container>
</template>

<script>
import { ref } from "vue";
export default {
  name: "NavBar",
  setup() {
    const isDrawerOpen = ref({ value: false });
    return { isDrawerOpen };
  },
};
</script>

<style></style>
