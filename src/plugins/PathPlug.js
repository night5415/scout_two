import { toJson } from "really-relaxed-json";

const PathPlugin = {
    install(Vue, pathConst) {
        Vue.prototype.$pathCreateDatabase = function () {
            var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);

            request.onupgradeneeded = function (event) {
                // Save the IDBDatabase interface
                var db = event.target.result;
                // Create an objectStore sfor this database
                db.createObjectStore(pathConst.dataStore.person, { keyPath: "Id" });
                db.createObjectStore(pathConst.dataStore.customer, { keyPath: "Id" });
                db.createObjectStore(pathConst.dataStore.account, { keyPath: "Id" });
                db.createObjectStore(pathConst.dataStore.sessionData, { keyPath: "Id" });
                db.createObjectStore(pathConst.dataStore.error, { keyPath: "Date" });
            };
        }

        Vue.prototype.$pathGenerateGuid = function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        }
        /**
         * Initial login into the site, this will create our session
         * and save off the users info into indexeddb. 
         * @param {string} userName - The users User Name.
         * @param {string} passWord - The users Password.
         */
        Vue.prototype.$pathLogin = function (userName, passWord, pin) {
            var formData = new FormData(),
                deviceId = this.$pathGenerateGuid();

            formData.append("loginUserName", userName);
            formData.append("loginPassword", passWord);
            formData.append("timeZone", "America/Chicago");
            formData.append("subMode", "mobile");
            formData.append("deviceId", deviceId);

            return this.axios.post(this.api, formData)
                .then(response => {
                    if (response.data) {
                        const loginInfo = toJson(response.data),
                            loginJson = JSON.parse(loginInfo),
                            context = loginJson.data.SecurityContext,
                            person = context.Person,
                            customer = context.Customer,
                            account = context.Account,
                            sessionData = {
                                "Id": deviceId,
                                "UserName": userName,
                                "PassWord": passWord,
                                "Pin": pin,
                                "SessionId": context.SessionIdentifier.Id,
                                "SupportsClinical": context.SupportsClinical,
                                "SupportsPayroll": context.SupportsPayroll,
                                "SupportsPracticeManagement": context.SupportsPracticeManagement,
                                "PayrollEnabled": loginJson.data.scoutInfo.payrollEnabled,
                                "EmpIsAvailableToSchedule": loginJson.data.scoutInfo.empIsAvailableToSchedule
                            };
                        var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
                        request.onsuccess = event => {
                            const db = event.target.result;
                            var personObjectStore = db.transaction(pathConst.dataStore.person, pathConst.readwrite)
                                .objectStore(pathConst.dataStore.person);
                            var customerObjectStore = db.transaction(pathConst.dataStore.customer, pathConst.readwrite)
                                .objectStore(pathConst.dataStore.customer);
                            var accountObjStore = db.transaction(pathConst.dataStore.account, pathConst.readwrite)
                                .objectStore(pathConst.dataStore.account);
                            var sessionDataObjStore = db.transaction(pathConst.dataStore.sessionData, pathConst.readwrite)
                                .objectStore(pathConst.dataStore.sessionData);

                            customerObjectStore.add(customer);
                            personObjectStore.add(person);
                            accountObjStore.add(account);
                            sessionDataObjStore.add(sessionData);
                        };
                        return person;
                    }
                });
        }
        /**
         * This will return a person object based on 
         * @param {string} personId - The users Id to get from the
         * local indexeddb.  
         */
        Vue.prototype.$pathGetUser = function (personId) {
            var promise = new Promise(function (resolve, reject) {
                var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
                request.onsuccess = event => {
                    const db = event.target.result,
                        personObjectStore = db.transaction(pathConst.dataStore.person, pathConst.readwrite)
                            .objectStore(pathConst.dataStore.person);

                    request.onerror = (event) => {
                        reject(event);
                    };

                    var records = personObjectStore.get(personId);
                    records.onerror = (event) => {
                        reject(event);
                    };

                    records.onsuccess = (queryResult) => {
                        resolve(queryResult.target.result);
                    };
                };
            });

            return promise;
        }
        /**
       * This will return a person object based on 
       * @param {object} error - The error to save to the 
       * local indexeddb.  
       */
        Vue.prototype.$pathSaveError = function name(error) {
            var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
            request.onsuccess = event => {
                const db = event.target.result;
                var errorObjectStore = db.transaction(pathConst.dataStore.error, pathConst.readwrite)
                    .objectStore(pathConst.dataStore.error);

                var customError = {
                    Date: Date.now(), //milliseconds,
                    Error: {
                        "message": error.message,
                        "stack": error.stack
                    }
                };

                errorObjectStore.add(customError);
            }
        }

        Vue.prototype.$pathGetErrors = function name(error) {
            var promise = new Promise(function (resolve, reject) {
                var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
                request.onsuccess = event => {
                    const db = event.target.result;
                    var errorObjectStore = db.transaction(pathConst.dataStore.error, pathConst.readwrite)
                        .objectStore(pathConst.dataStore.error);

                    request.onerror = (event) => {
                        reject(event);
                    };

                    var records = errorObjectStore.getAll();
                    records.onerror = (event) => {
                        reject(event);
                    };

                    records.onsuccess = (queryResult) => {
                        resolve(queryResult.target.result);
                    };
                }
            });

            return promise;
        }
    }
};

export default PathPlugin;
