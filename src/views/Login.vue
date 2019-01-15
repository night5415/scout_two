<template>
  <div>
    <Authenticate/>
    <v-card flat color="transparent">
      <v-img src="/img/icons/apple-touch-icon-180x180.png" contain height="90"></v-img>
    </v-card>
  </div>
</template>

<script>
import Authenticate from "@/components/PathAuthenticate";
export default {
  name: "PathLogin",
  components: { Authenticate },
  data() {
    return {};
  }
};
</script>

<style>
.fixed {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
