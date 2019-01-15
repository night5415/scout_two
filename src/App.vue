<template>
  <v-app>
    <PathNavigation/>
    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import PathNavigation from "@/components/PathNavigation";
export default {
  name: "App",
  components: { PathNavigation },
  mounted() {
    console.log("App mounted");
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
</style>


