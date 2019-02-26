var system = {
  dbName: "ScoutDb", // deprecated
  dbVersion: 4, // deprecated
  readwrite: "readwrite"
};

var route = {
  login: {
    name: "login",
    path: "/"
  },
  home: {
    name: "home",
    path: "/home"
  },
  new: {
    name: "new",
    path: "/new"
  },
  myday: {
    name: "myday",
    path: "/myday"
  },
  patient: {
    name: "patient",
    path: "/patient"
  },
  offline: {
    name: "offline",
    path: "/offline"
  },
  phi: {
    name: "phi",
    path: null
  },
  dev: {
    name: "development",
    path: "/Dev"
  },
  sandbox: {
    name: "sandbox",
    path: "/sandbox"
  },
  error: {
    name: "error",
    path: "/*"
  },
  setting: {
    name: "setting",
    path: "/setting"
  }
}

var dataStore = {
  login: "login",
  participant: "participant",
  person: "person", // deprecated
  customer: "customer",
  account: "account",
  sessionData: "sessionData",
  exceptions: "exceptions",
  location: "location"
}

var button = {
  accept: "Accept",
  decline: "Decline"
}

export {
  system,
  route,
  dataStore,
  button
};