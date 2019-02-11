<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex text-xs-center>
          <v-tooltip left>
            <v-btn slot="activator" :href="source" icon large target="_blank">
              <v-icon large>code</v-icon>
            </v-btn>
            <span>Source</span>
          </v-tooltip>
          <v-tooltip right>
            <v-btn
              slot="activator"
              icon
              large
              href="https://codepen.io/johnjleider/pen/rJdVMq"
              target="_blank"
            >
              <v-icon large>mdi-codepen</v-icon>
            </v-btn>
            <span>Codepen</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template> 
<script>
import sig from "@/components/shared/PathSignature";
import loader from "@/components/global/PathLoader";
export default {
  components: { sig, loader },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    getSignature() {
      var signatureBox = this.$refs.signatureBox;
      if (signatureBox) {
        var data = signatureBox.getSignatureData();
        console.log(data);
      }
    }
  }
};
</script>

<style>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
#signature {
  background-color: lightgray;
}
</style>
