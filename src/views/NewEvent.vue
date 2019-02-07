<template>
  <div>
    <Phoebe :body="body" :title="title"/>
  </div>
</template>

<script>
import Phoebe from "@/components/shared/Phoebe";
export default {
  name: "newevent",
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
      body:
        "This is where our clients will add new events to our awesome system   🌮🌮🌮",
      title: "New Events"
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

