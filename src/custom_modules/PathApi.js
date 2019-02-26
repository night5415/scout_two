import axios from "axios";
import store from "@/pathStore";

const api = class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get participant() {
    let self = this,
      url = `${store.getters.baseUrl}/scout/~api/participant`,
      param = {
        params: {
          securityToken: store.getters.Token,
          page: 1,
          start: 0,
          limit: -1
        }
      };

    return axios.get(url, param);
  }

  get session() {
    let self = this,
      url = ``;

    return "woohoo!";
  }

  getBaseUrl = () => {
    let hostName = window.location.hostname,
      local = "https://test-lighthouse.abpathfinder.net";

    return hostName === "localhost" ? local : window.location.host;
  }
};

export { api };
