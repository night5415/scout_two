<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex flex sm8 md6 lg4>
        <v-card flat color="transparent">
          <form action>
            <v-text-field v-model="username" label="UserName" required></v-text-field>
            <v-text-field v-model="password" :counter="10" label="Password" required></v-text-field>
            <!-- <v-text-field v-model="pin" label="Pin" required type="number"></v-text-field> -->
          </form>
          <v-card-actions>
            <v-btn
              :loading="waiting"
              :disabled="waiting"
              v-on:click="onLogin_Click"
              flat
              color="blue"
            >Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { toJson } from "really-relaxed-json";
export default {
  name: "PathAuthenticate",
  computed: {
    username: {
      get() {
        return this.$store.state.user.UserName;
      },
      set(value) {
        this.$store.dispatch("updateUserName", value);
      }
    },
    password: {
      get() {
        return this.$store.state.user.PassWord;
      },
      set(value) {
        this.$store.dispatch("updatePassWord", value);
      }
    },
    pin: {
      get() {
        return this.$store.state.user.Pin;
      },
      set(value) {
        this.$store.dispatch("updatePin", value);
      }
    }
  },
  data() {
    return {
      waiting: false
    };
  },
  methods: {
    onLogin_Click() {
      var self = this;
      self.waiting = true;

      self.$pathUtil
        .generateKey(self.username, self.password)
        .then(key => {
          pathVue.$pathPouch.setEncryptionKey(key);
          return self.$store.dispatch("updateEncryptionKey", key);
        })
        .then(key => {
          self.$pathUtil
            .Login(self.username, self.password)
            .then(returnValue => {
              self.$store.dispatch("updateLogin", true);
              self.$router.push("/home");
              return self.$store.dispatch("updateUserId", returnValue.Id);
            })
            .then(d => {
              return self.$pathLocation.HasGeoLocationEnabled();
            })
            .then(hasGeo => {
              if (hasGeo) {
                return self.$pathLocation.GetCurrentPosition();
              } else {
                return {};
              }
            })
            .then(location => {
              self.$store.dispatch("updateLocation", location);
              //self.$pathData.location.Save(location);
              return Promise.resolve(true);
            })
            .catch(err => {
              let snackMessage = "Hmmmmm, something went wrong";
              if (!err.response)
                err.response = {
                  status: 502
                };

              switch (err.response.status) {
                case 502:
                  snackMessage = "Bad Gateway";
                  break;
                case 401:
                  snackMessage = "Username or Password is incorrect";
                  break;
                case 500:
                  snackMessage =
                    "Looks like the server is down, please try again later";
                  break;
              }
              pathVue.$pathComponents.Snack(snackMessage);
            })
            .finally(function() {
              self.waiting = false;
            });
        });

      //this will udpate location if coords change
      self.$pathLocation.StartLocationWatch(location => {
        self.$store.dispatch("updateLocation", location);
        //pathVue.$pathData.location.Save(location);
      });
    }
  }
};
</script>

<style scoped>
form {
  padding: 25px 20px;
  margin: 10px 0;
}
</style>
