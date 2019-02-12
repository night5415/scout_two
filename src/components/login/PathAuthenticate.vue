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
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{snackMessage}}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { toJson } from "really-relaxed-json";
import security from "@/plugins/PathSecurity";
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
      snackbar: false,
      snackMessage: "",
      waiting: false,
      timeout: 3000,
      mode: null
    };
  },
  methods: {
    onLogin_Click() {
      var self = this;
      self.waiting = true;

      self.$pathUtil
        .Login(self.username, self.password)
        .then(returnValue => {
          self.$router.push("/home");
          self.$store.dispatch("updateLogin", true);
          return self.$store.dispatch("updateUserId", returnValue.Id);
        })
        .then(a => {
          return security.generateKey(self.username, self.password);
        })
        .then(key => {
          return self.$store.dispatch("updateEncryptionKey", key);
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
          self.$pathData.location.Save(location);
        })
        .catch(err => {
          self.$pathData.error.Save(err);

          if (!err.response)
            err.response = {
              status: 502
            };

          switch (err.response.status) {
            case 502:
              self.snackMessage = "Unknown error";
              break;
            case 401:
              self.snackMessage = "Username or Password is incorrect";
              break;
            case 500:
              self.snackMessage =
                "Looks like the server is down, please try again later";
              break;
            default:
              self.snackMessage = "Hmmmmm, something went wrong";
          }
          self.snackbar = true;
        })
        .finally(function() {
          self.waiting = false;
        });

      //this will udpate location if coords change
      self.$pathLocation.StartLocationWatch(location => {
        self.$store.dispatch("updateLocation", location);
        pathVue.$pathData.location.Save(location);
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
