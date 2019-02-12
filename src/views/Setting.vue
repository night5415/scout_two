<template>
  <v-content>
    <v-container fluid fill-height class="pa-0 ma-0">
      <v-layout row>
        <v-flex lg12>
          <v-card>
            <v-list subheader two-line>
              <v-subheader>Theme</v-subheader>

              <v-list-tile @click="themeChange">
                <v-list-tile-action>
                  <v-checkbox v-model="light"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click="light = !light">
                  <v-list-tile-title>Light</v-list-tile-title>
                  <v-list-tile-sub-title>High Contrast</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="themeChange">
                <v-list-tile-action>
                  <v-checkbox v-model="dark"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click="dark = !dark">
                  <v-list-tile-title>Dark</v-list-tile-title>
                  <v-list-tile-sub-title>Easy on the eyes</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile @click="themeChange">
                <v-list-tile-action>
                  <v-checkbox v-model="pathfinder"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click="pathfinder = !pathfinder">
                  <v-list-tile-title>Custom</v-list-tile-title>
                  <v-list-tile-sub-title>Good ol' Pathfinder colors, fly'm with pride!</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      dark: true,
      light: false,
      pathfinder: false
    };
  },
  methods: {
    themeChange: function() {
      let self = this,
        dark = self.$data.dark;
      self.$store.dispatch("updateDark", dark);
    }
  }
};
</script>

<style>
</style>
