<template>
  <div>
    <v-tabs grow color="cyan" dark slider-color="yellow">
      <v-tab ripple>User</v-tab>
      <v-tab ripple>Account</v-tab>
      <v-tab ripple>Session</v-tab>
      <v-tab ripple>Errors</v-tab>
      <v-tab-item>
        <UserTab/>
      </v-tab-item>
      <v-tab-item>
        <div>Account info</div>
      </v-tab-item>
      <v-tab-item>
        <div>
          <PathBingMap/>
        </div>
      </v-tab-item>
      <v-tab-item>
        <ErrorTab/>
      </v-tab-item>
    </v-tabs>
    <v-snackbar v-model="showSnack" color="green">Woohoo!</v-snackbar>
    <v-fab-transition>
      <v-btn color="red" dark fab fixed bottom right v-on:click="onSave_Click">
        <v-icon>save</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import ErrorTab from "@/tabs/development/ErrorTab";
import UserTab from "@/tabs/development/UserTab";
import PathBingMap from "@/components/shared/PathBingMap";
export default {
  components: { ErrorTab, UserTab, PathBingMap },

  data() {
    return {
      showSnack: false
    };
  },
  mounted: function() {
    var self = this;
  },
  methods: {
    onSave_Click() {
      this.showSnack = true;

      test();
    },
    init: function() {
      this.message = "init called! Expecting an alert box after this!!";
      throw "some error!!";
    }
  }
};
</script>

<style>
</style>
