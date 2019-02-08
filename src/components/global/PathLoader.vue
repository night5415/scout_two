<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" persistent width="300">
      <v-card color="cyan" dark>
        <v-card-text>Loading...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 4000);
    }
  }
};
</script>

<style>
</style>
