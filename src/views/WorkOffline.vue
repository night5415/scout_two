<template>
  <div>
    <Phoebe :body="body" :title="title"/>
  </div>
</template>

<script>
import Phoebe from "@/components/shared/Phoebe";
export default {
  name: "offline",
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
      body: "🤩 You mean this will work offline as well..... whaaaaaat! 🤩",
      title: "Offline"
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
