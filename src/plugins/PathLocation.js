const PathLocation = {
  install(Vue, options) {
    Vue.prototype.$pathLocation = {
      HasGeoLocationEnabled: function() {
        return new Promise((res, rej) => {
          if ("geolocation" in navigator) {
            res(true);
          } else {
            res(false);
          }
        });
      },

      StartLocationWatch: function(success, fail) {
        navigator.geolocation.watchPosition(success, fail);
      },

      GetCurrentPosition: function() {
        return new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(function(position) {
            return res(position);
          });
        });
      },

      ClearLocationWatch: function(watchID) {
        navigator.geolocation.clearWatch(watchID);
      }
    };
  }
};

export default PathLocation;
