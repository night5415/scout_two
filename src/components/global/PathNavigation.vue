<template>
  <nav>
    <v-toolbar flat app fixed>
      <v-toolbar-side-icon v-bind:class="{ isLoggedIn: notLoggedInYet }" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Data Collector</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      :mini-variant.sync="mini"
      v-bind:class="{ isLoggedIn: notLoggedInYet }"
    >
      <v-list class="pt-3">
        <v-list-tile
          v-for="link in navLinks"
          :key="link.key"
          :to="link.url"
          @click="navClick($event, link.action)"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-3">
        <v-list-tile v-for="link in devLinks" :key="link.key" :to="link.url">
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
      drawer: null,
      mini: false,
      navLinks: [
        { key: 1, title: "Home", icon: "home", url: "/Home" },
        { key: 2, title: "Report My Day", icon: "event_note", url: "/MyDay" },
        { key: 3, title: "Patient", icon: "person", url: "/Patient" },
        { key: 4, title: "New Event", icon: "calendar_today", url: "/New" },
        { key: 5, title: "Work Offline", icon: "power", url: "/Offline" },
        {
          key: 6,
          title: "Go To PHI",
          icon: "open_in_new",
          action: "linkToPHI"
        },
        { key: 7, title: "Log Out", icon: "exit_to_app", action: "logOut" },
        { key: 8, title: "Settings", icon: "settings", url: "/Setting" }
      ],
      devLinks: [
        { key: 9, title: "Dev", icon: "code", url: "/Dev" },
        { key: 10, title: "Sandbox", icon: "developer_mode", url: "/Sandbox" }
      ]
    };
  },
  methods: {
    navClick(event, action) {
      var self = this;
      if (self[action] instanceof Function) {
        self[action]();
      }
    },
    linkToPHI() {
      window.open("https://test-lighthouse.abpathfinder.net", "_blank");
    },
    logOut(self) {
      var self = this;
      pathVue.$pathComponents
        .Confirm({
          title: "Are you sure?",
          body: "Clicking yes will log you out!",
          accept: "Yes",
          decline: "No"
        })
        .then(e => {
          if (e) {
            self.$pathUtil.LogOut();
          }
        });
    }
  },
  computed: {
    //this will hide stuff prior to log in
    notLoggedInYet: {
      get() {
        return !this.$store.state.app.isLoggedIn;
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
