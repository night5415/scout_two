import axios from "axios";
import store from "@/pathStore";

const api = class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get participant() {
    let self = this,
      url = `${self.baseUrl}/scout/~api/participant`,
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
};

export { api };
