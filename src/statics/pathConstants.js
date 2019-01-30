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
        "dev": { "name": "development", "path": "/Dev" }
    }
};

export default pathConst;