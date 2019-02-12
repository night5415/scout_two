<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex>
          <v-tooltip>
            <v-btn slot="activator" @click="getKey" icon large>
              <v-icon large>build</v-icon>
            </v-btn>
            <span>Hit me!</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template> 
<script>
import sig from "@/components/shared/PathSignature";
import loader from "@/components/global/PathLoader";
import security from "@/plugins/PathSecurity";
export default {
  components: { sig, loader },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    getKey() {
      var x = security.generateKey("urs", "ll");
    },
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
