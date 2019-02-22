import { toJson } from "really-relaxed-json";
import axios from "axios";
import router from "@/router";
import store from "@/pathStore";
import { api } from "@/custom_modules/PathApi";
import { Promise } from "q";

const PathUtil = {
  install(Vue, baseUrl) {
    Vue.prototype.$pathUtil = {
      baseUrl: baseUrl,
      loginApi: `${baseUrl}/~api/login`,
      /**
       * This will check to see if the browser has the
       * capability to run the app..
       */
      CheckBrowserCompatability: function () {
        return Promise.resolve(true);
      },
      GenerateGuid: function () {
        function _p8(s) {
          var p = (Math.random().toString(16) + "000000000").substr(2, 8);
          return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
      },
      /** 
       * 
       */
      Login: function (userName, passWord, pin) {
        var self = this,
          formData = new FormData(),
          deviceId = self.GenerateGuid(),
          isOnline = store.getters.isOnline;

        if (!isOnline) {
          return self
            .generateKey(`${userName}${passWord}`, `${userName}${passWord}`)
            .then(key => {
              return pathVue.$pathPouch.login.getById(key);
            })
            .then(login => {
              let data = login.data;
              store.dispatch("updateSecurityToken", data.securityToken);
              return Promise.resolve(data.Person);
            });
        } else {
          formData.append("loginUserName", userName);
          formData.append("loginPassword", passWord);
          formData.append("timeZone", "America/Chicago"); // will need to figure this out
          formData.append("subMode", "mobile");
          formData.append("deviceId", deviceId);

          return axios.post(self.loginApi, formData).then(response => {
            if (response.data) {
              const loginInfo = toJson(response.data),
                loginJson = JSON.parse(loginInfo),
                context = loginJson.data.SecurityContext,
                person = context.Person;
              //save to Vuex store
              store.dispatch("updateSecurityToken", loginJson.data.securityToken);
              //save to PouchDB
              let newLogin = JSON.parse(JSON.stringify(context));
              self
                .generateKey(`${userName}${passWord}`, `${userName}${passWord}`)
                .then(key => {
                  newLogin.Id = key;
                  pathVue.$pathPouch.login.saveOrUpdate(newLogin);
                });

              return person;
            }
          });
        }
      },
      /**
       *
       * @param {*} params
       */
      LogOut: function (params) {
        var self = this;
        store.dispatch("resetState", null);
        self.Navigate("/");
      },
      /**
       * pass in a valid path to auto navigate
       * @param {string} path - where to navigate to
       */
      Navigate: function (path) {
        router.push(path);
      },
      /**
       * 
       */
      generateKey: (userName, passWord) => {
        var arrayBufferToHexString = arrayBuffer => {
          var byteArray = new Uint8Array(arrayBuffer);
          var hexString = "";
          var nextHexByte;

          for (var i = 0; i < byteArray.byteLength; i++) {
            nextHexByte = byteArray[i].toString(16);
            if (nextHexByte.length < 2) {
              nextHexByte = "0" + nextHexByte;
            }
            hexString += nextHexByte;
          }
          return hexString;
        };
        var stringToArrayBuffer = string => {
          var encoder = new TextEncoder("utf-8");
          return encoder.encode(string);
        };

        // First, create a PBKDF2 "key" containing the password
        return window.crypto.subtle
          .importKey(
            "raw",
            stringToArrayBuffer(passWord),
            {
              name: "PBKDF2"
            },
            false,
            ["deriveKey"]
          ) // Derive a key from the password
          .then(function (baseKey) {
            return window.crypto.subtle.deriveKey(
              {
                name: "PBKDF2",
                salt: stringToArrayBuffer(userName),
                iterations: 100,
                hash: "SHA-256"
              },
              baseKey,
              {
                name: "AES-CBC",
                length: 128
              }, // Key we want
              true, // Extrable
              ["encrypt", "decrypt"] // For new key
            );
          }) // Export it so we can display it
          .then(function (aesKey) {
            return window.crypto.subtle.exportKey("raw", aesKey);
          }) // Display it in hex format
          .then(function (keyBytes) {
            return arrayBufferToHexString(keyBytes);
          });
      }
    };
  }
};

export default PathUtil;
