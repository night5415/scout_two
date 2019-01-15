<template>
  <v-container fluid>
    <v-layout align-center justify-center row fill-height>
      <v-flex flex sm8 md6 lg4>
        <v-card flat color="transparent">
          <form action>
            <v-text-field :counter="10" v-model="username" label="UserName" required></v-text-field>
            <v-text-field v-model="password" :counter="10" label="Password" required></v-text-field>
            <v-text-field v-model="pin" label="Pin" required></v-text-field>
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
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{snackMessage}}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
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
      api: "http://localhost:9013/scout/~api/login",
      snackbar: false,
      snackMessage: "",
      waiting: false,
      timeout: 2000,
      x: null,
      y: null,
      mode: null
    };
  },
  methods: {
    onLogin_Click() {
      var self = this;
      self.waiting = true;
      self
        .$pathLogin(self.username, self.password)
        .then(returnValue => {
          self.$store.dispatch("updateLogin", true);
          self.$router.push("/home");
        })
        .catch(err => {
          self.$pathSaveError(err);

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
