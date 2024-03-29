<template>
  <v-main>
    <v-naviagtion-drawer color="red">mm</v-naviagtion-drawer>
    <v-container>
      <v-app-bar class="border-b">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title> União Desportiva do Zimpeto</v-app-bar-title>

        <template #append>
          <v-avatar color="info">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </template>
      </v-app-bar>
      <h2>Dashbord</h2>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify/tree/next",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
  }),
};
</script>
