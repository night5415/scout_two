<template>
  <div id="map"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    pathVue.$pathGetCurrentPosition().then(position => {
      var map = new Microsoft.Maps.Map(document.getElementById("map"), {
        center: new Microsoft.Maps.Location(
          position.coords.latitude,
          position.coords.longitude
        ),
        mapTypeId: Microsoft.Maps.MapTypeId.seasonal,
        zoom: 10
      });
    });
  }
};
</script>

<style scope>
#map {
  height: 300px;
  width: 50vw;
  margin: 25vh auto;
  background-color: lightgray;
  border-radius: 6px;
  box-shadow: 10px 10px 10px lightslategrey;
}
</style>
