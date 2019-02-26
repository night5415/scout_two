<template>
  <v-app :dark="darkTheme">
    <PathNavigation/>
    <PathConfirm ref="pathConfirm"/>
    <PathSnack ref="pathSnack"/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-avatar color="transparent" class="fixed-logo">
      <v-img src="/img/icons/apple-touch-icon-180x180.png" contain height="90"></v-img>
    </v-avatar>
  </v-app>
</template> 
<script>
import PathNavigation from "@/components/global/PathNavigation";
import PathConfirm from "@/components/global/PathConfirm";
import PathSnack from "@/components/global/PathSnack";
export default {
  name: "App",
  components: { PathNavigation, PathConfirm, PathSnack },
  mounted() {
    let self = this;
    //these will
    window.addEventListener("online", self.updateOnlineStatus);
    window.addEventListener("offline", self.updateOnlineStatus);

    self.$root.$pathComponents = {
      Confirm: self.$refs.pathConfirm.open,
      Snack: self.$refs.pathSnack.showSnack
    };
    //set initial online status
    self.$store.dispatch("updateIsOnline", navigator.onLine);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.$store.dispatch("updateIsOnline", type === "online");
    }
  },
  data() {
    return {};
  },
  computed: {
    darkTheme: {
      get() {
        var self = this;
        return self.$store.getters.Dark;
      }
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fixed-logo {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
</style>
