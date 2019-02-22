<template>
  <div>
    <Phoebe :body="body" :title="title"/>
  </div>
</template>

<script>
import Phoebe from "@/components/shared/Phoebe";
export default {
  name: "patient",
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
      body: "What do we have here, all these lovely people",
      title: "Patient list"
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
