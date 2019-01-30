<template>
  <nav>
    <v-toolbar flat app color="cyan" dark>
      <v-toolbar-title>Data Collector</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon v-bind:class="{ isLoggedIn: notLoggedInYet }" @click="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app class="white">
      <v-divider></v-divider>
      <v-list class="pt-3">
        <v-list-tile
          v-for="link in navLinks"
          :key="link.key"
          @click="drawer = !drawer"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
 
<script>
export default {
  name: "PathNavigation",
  mounted() {},
  data() {
    return {
      hidden: false,
      onLine: navigator.onLine,
      drawer: false,
      navLinks: [
        { key: 1, title: "Home", icon: "dashboard", url: "/Home" },
        { key: 2, title: "About", icon: "question_answer", url: "/About" },
        { key: 3, title: "Login", icon: "vpn_key", url: "/" },
        { key: 4, title: "Dev", icon: "developer_mode", url: "/Dev" }
      ]
    };
  },
  computed: {
    //this will hide stuff prior to log in
    notLoggedInYet: {
      get() {
        return !this.$store.state.isLoggedIn;
      }
    }
  }
};
</script>

<style>
.isLoggedIn {
  display: none;
}
</style>
