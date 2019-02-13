import { toJson } from "really-relaxed-json";
import axios from 'axios';
import pathConst from '@/statics/pathConstants';
import router from "@/router";
import store from "@/pathStore";

const PathUtil = {
    install(Vue, baseUrl) {
        Vue.prototype.$pathUtil = {
            api: `${baseUrl}/~api/login`,
            /**
             * this creates the local DB's in indexed db
             */
            CreateDatabase: function () {
                var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);

                //this will fire when the version of the DB changes.
                request.onupgradeneeded = function (event) {
                    // Save the IDBDatabase interface
                    var db = event.target.result;
                    // Create an objectStore sfor this database
                    db.createObjectStore(pathConst.dataStore.person, { keyPath: "Id" });
                    //this creates an index on the "table" to make queries easier
                    var customerObjStore = db.createObjectStore(pathConst.dataStore.customer, { keyPath: "Id" });
                    customerObjStore.createIndex("FirstName", "FirstName", { unique: false });
                    customerObjStore.createIndex("LastName", "LastName", { unique: false });
                    db.createObjectStore(pathConst.dataStore.account, { keyPath: "Id" });
                    db.createObjectStore(pathConst.dataStore.sessionData, { keyPath: "Id" });
                    db.createObjectStore(pathConst.dataStore.error, { keyPath: "Date" });
                    db.createObjectStore(pathConst.dataStore.location, { keyPath: "Date" });
                    db.createObjectStore(pathConst.dataStore.participant, { keyPath: "Id" });
                };
            },
            /**
             * This returns a new guid
             */
            GenerateGuid: function () {
                function _p8(s) {
                    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
                }
                return _p8() + _p8(true) + _p8(true) + _p8();
            },
            Login: function (userName, passWord, pin) {
                var self = this,
                    formData = new FormData(),
                    deviceId = self.GenerateGuid(),
                    str = store;

                formData.append("loginUserName", userName);
                formData.append("loginPassword", passWord);
                formData.append("timeZone", "America/Chicago"); // will need to figure this out
                formData.append("subMode", "mobile");
                formData.append("deviceId", deviceId);

                return axios.post(self.api, formData)
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
                            str.dispatch('updateSecurityToken', loginJson.data.securityToken)
                            var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
                            request.onsuccess = event => {
                                const db = event.target.result,
                                    personObjectStore = db.transaction(pathConst.dataStore.person, pathConst.readwrite)
                                        .objectStore(pathConst.dataStore.person),
                                    customerObjectStore = db.transaction(pathConst.dataStore.customer, pathConst.readwrite)
                                        .objectStore(pathConst.dataStore.customer),
                                    accountObjStore = db.transaction(pathConst.dataStore.account, pathConst.readwrite)
                                        .objectStore(pathConst.dataStore.account),
                                    sessionDataObjStore = db.transaction(pathConst.dataStore.sessionData, pathConst.readwrite)
                                        .objectStore(pathConst.dataStore.sessionData);

                                customerObjectStore.add(customer);
                                personObjectStore.add(person);
                                accountObjStore.add(account);
                                sessionDataObjStore.add(sessionData);
                            };
                            return person;
                        }
                    });
            },
            /**
             * Initial login into the site, this will create our session
             * and save off the users info into indexeddb. 
             * @param {string} userName - The users User Name.
             * @param {string} passWord - The users Password.
             */
            LoginAsync: async function (userName, passWord, pin) {
                var self = this,
                    formData = new FormData(),
                    deviceId = self.GenerateGuid(),
                    str = store;

                formData.append("loginUserName", userName);
                formData.append("loginPassword", passWord);
                formData.append("timeZone", "America/Chicago"); // will need to figure this out
                formData.append("subMode", "mobile");
                formData.append("deviceId", deviceId);

                const response = await axios.post(self.api, formData);
                if (response.data) {
                    const loginInfo = toJson(response.data), loginJson = JSON.parse(loginInfo), context = loginJson.data.SecurityContext, person = context.Person, customer = context.Customer, account = context.Account, sessionData = {
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
                        const db = event.target.result, personObjectStore = db.transaction(pathConst.dataStore.person, pathConst.readwrite)
                            .objectStore(pathConst.dataStore.person), customerObjectStore = db.transaction(pathConst.dataStore.customer, pathConst.readwrite)
                                .objectStore(pathConst.dataStore.customer), accountObjStore = db.transaction(pathConst.dataStore.account, pathConst.readwrite)
                                    .objectStore(pathConst.dataStore.account), sessionDataObjStore = db.transaction(pathConst.dataStore.sessionData, pathConst.readwrite)
                                        .objectStore(pathConst.dataStore.sessionData);
                        customerObjectStore.add(customer);
                        personObjectStore.add(person);
                        accountObjStore.add(account);
                        sessionDataObjStore.add(sessionData);
                    };
                    return person;
                }
            },
            /**
             * 
             * @param {*} params 
             */
            LogOut: function (params) {
                var self = this,
                    str = store;
                str.dispatch("resetState", null);
                self.Navigate('/');
            },
            /**
             * pass in a valid path to auto navigate
             * @param {pathConst} path - where to navigate to
             */
            Navigate: function (path) {
                router.push(path);
            }
        };
    }
};

export default PathUtil;
