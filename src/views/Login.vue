<template>
  <div>
    <Authenticate/>
  </div>
</template>

<script>
import Authenticate from "@/components/login/PathAuthenticate";
export default {
  name: "PathLogin",
  components: { Authenticate },
  data() {
    return {};
  }
};
</script>

<style>
</style>
