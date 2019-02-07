<template>
  <div>
    <Phoebe :body="body" :title="title"/>
  </div>
</template>

<script>
import Phoebe from "@/components/shared/Phoebe";
export default {
  name: "myday",
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
      body: "Let's see what you've done today....hmmmmmmm",
      title: "Report My Day"
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

