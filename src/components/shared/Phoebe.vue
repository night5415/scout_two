<template>
  <v-card class="mx-auto space" color="#26c6da" dark max-width="400" raised>
    <v-card-title>
      <span class="title font-weight-light">{{title}}</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">{{body}}</v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://test-lighthouse.abpathfinder.net/Pathfinder/resources/images/phoebe_taylor.png"
          ></v-img>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>Pheobe Taylor</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["title", "body"]
};
</script>
<style scoped>
.space {
  margin-top: 15vh;
}
</style>
