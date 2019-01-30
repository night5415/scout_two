<template>
  <v-app>
    <PathNavigation/>
    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
    <v-avatar color="transparent" class="fixed-logo">
      <v-img src="/img/icons/apple-touch-icon-180x180.png " contain height="90"></v-img>
    </v-avatar>
  </v-app>
</template>

<script>
import PathNavigation from "@/components/PathNavigation";
export default {
  name: "App",
  components: { PathNavigation },
  mounted() {
    console.log("App mounted");
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
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


