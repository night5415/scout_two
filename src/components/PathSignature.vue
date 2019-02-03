<template>
  <div>
    <v-dialog v-model="dialog" height="500px" max-width="50vw">
      <v-card>
        <v-card-title>
          <span>{{title}}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text style="height:50vh; width:50vw; background-color:lightgray;">
          <VueSignaturePad id="signature" width="100%" height="100%" v-bind:ref="referenceId"/>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" v-on:click="undo">Undo</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" v-on:click="save">Save</v-btn>
          <v-btn color="primary" flat @click="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="primary" dark @click="dialog = true">Get {{title}}</v-btn>
  </div>
</template>

<script>
export default {
  props: ["title", "referenceId"],
  mounted: function() {
    this.$refs[this.$props.referenceId].resizeCanvas();
  },
  data() {
    return {
      dialog: false,
      value: null
    };
  },
  methods: {
    undo() {
      this.$refs[this.$props.referenceId].resizeCanvas();
      this.$refs[this.$props.referenceId].undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs[
        this.$props.referenceId
      ].saveSignature();
      this.value = data;
      this.dialog = false;
    },
    getSignatureData() {
      return this.value;
    }
  }
};
</script>

<style>
</style>
