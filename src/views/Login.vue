<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex>
        <Authenticate/>
      </v-flex>
    </v-layout>
  </v-container>
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
