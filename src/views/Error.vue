<template>
  <div>
    <Phoebe :body="body" :title="title"/>
  </div>
</template>

<script>
import Phoebe from "@/components/shared/Phoebe";
export default {
  name: "error",
  components: {
    Phoebe
  },
  beforeMount() {},
  mounted() {},
  beforeCreate() {},
  beforeDestroy() {},
  destroyed() {},
  data() {
    return {
      body: "Oh my, seems like something went wrong!",
      title: "Opps"
    };
  },
  methods: {
    name() {}
  },
  filters: {
    fnName: function(value) {
      return value;
    }
  }
};
</script>

<style scope>
</style>
