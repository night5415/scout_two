<template>
  <div>
    <sig title="Guardian signature" ref="signatureBox" referenceId="guardianSignature"/>
    <v-btn flat large color="primary" v-on:click="getSignature">Get Signature</v-btn>
  </div>
</template> 
<script>
import sig from "@/components/shared/PathSignature";
export default {
  components: { sig },
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
