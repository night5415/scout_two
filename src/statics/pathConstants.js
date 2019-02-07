var pathConst = {
    "dbName": "ScoutDb",
    "dbVersion": 4,
    "readwrite": "readwrite",
    "dataStore": {
        "person": "person",
        "customer": "customer",
        "account": "account",
        "sessionData": "sessionData",
        "error": "error",
        "location": "location"
    },
    "route": {
        "login": { "name": "login", "path": "/" },
        "home": { "name": "home", "path": "/home" },
        "new": { "name": "new", "path": "/new" },
        "myday": { "name": "myday", "path": "/myday" },
        "patient": { "name": "patient", "path": "/patient" },
        "offline": { "name": "offline", "path": "/offline" },
        "phi": { "name": "phi", "path": null },
        "dev": { "name": "development", "path": "/Dev" },
        "sandbox": { "name": "sandbox", "path": "/sandbox" },
        "error": { "name": "error", "path": "/error" }
    }
};

export default pathConst;