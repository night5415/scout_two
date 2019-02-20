import { toJson } from "really-relaxed-json";
import axios from 'axios';
import pathConst from '@/statics/pathConstants';
import router from "@/router";
import store from "@/pathStore";
import { api } from '@/custom_modules/PathApi';
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

                return axios.post(self.loginApi, formData)
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
                            str.dispatch('updateSecurityToken', loginJson.data.securityToken);


                            /**
                             * this will be going away... using pouchDB
                             */
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
                            /**
                            * this will be going away... using pouchDB
                            */


                            var newLogin = JSON.parse(JSON.stringify(person));

                            self.generateKey(`${userName}${passWord}`, `${userName}${passWord}`)
                                .then(key => {
                                    newLogin.Id = key;
                                    pathVue.$pathPouch.login.saveOrUpdate(newLogin);
                                })


                            return person;
                        }
                    });
            },
            /**
             * 
             * @param {*} params 
             */
            LogOut: function (params) {
                var self = this;
                store.dispatch("resetState", null);
                self.Navigate('/');
            },
            /**
             * pass in a valid path to auto navigate
             * @param {pathConst} path - where to navigate to
             */
            Navigate: function (path) {
                router.push(path);
            },
            /**
             * This will load our session store full of 
             * data :)
             */
            loadVuex: function () {
                let self = this,
                    _api = new api(self.baseUrl),
                    participant = _api.participant;

                participant.then(response => {
                    if (response && response.status === 200) {
                        let data = response.data;
                        if (data.success) {
                            let records = data.data;
                            if (records.length > 0) {
                                records.forEach(element => {
                                    store.dispatch("updateParticipantList", element);
                                    pathVue.$pathPouch.participant.saveOrUpdate(element);
                                });
                            } else {
                                //no records
                                Promise.reject('No records found for participant');
                            }
                        } else {
                            //call not successful
                            Promise.reject(`Server returned a status of ${response.status}`);
                        }
                    }
                })
                    .catch(err => {
                        console.log('Err in loadVuex', err);
                    });

                return Promise.resolve(true);
            },
            generateKey: (userName, passWord) => {
                var arrayBufferToHexString = (arrayBuffer) => {
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
                }
                var stringToArrayBuffer = (string) => {
                    var encoder = new TextEncoder("utf-8");
                    return encoder.encode(string);
                }

                // First, create a PBKDF2 "key" containing the password
                return window.crypto.subtle.importKey("raw", stringToArrayBuffer(passWord), {
                    "name": "PBKDF2"
                }, false, ["deriveKey"]).// Derive a key from the password
                    then(function (baseKey) {
                        return window.crypto.subtle.deriveKey({
                            "name": "PBKDF2",
                            "salt": stringToArrayBuffer(userName),
                            "iterations": 100,
                            "hash": 'SHA-256'
                        }, baseKey, {
                                "name": "AES-CBC",
                                "length": 128
                            }, // Key we want
                            true, // Extrable
                            ["encrypt", "decrypt"]// For new key
                        );
                    }).// Export it so we can display it
                    then(function (aesKey) {
                        return window.crypto.subtle.exportKey("raw", aesKey);
                    }).// Display it in hex format
                    then(function (keyBytes) {
                        return arrayBufferToHexString(keyBytes);
                    });
            }
        };
    }
};

export default PathUtil;
