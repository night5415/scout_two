import { toJson } from "really-relaxed-json";
import axios from 'axios';
import pathConst from '@/statics/pathConstants';
import store from "@/pathStore";
// This is a central location where we can perform CRUD operations on IndexedDB
// that can be accessed app wide instead of having it sprinkled throughout the code
// base.

const PathData = {
    install(Vue, baseUrl) {
        Vue.prototype.$pathData = {
            session: {

            },
            person: {
                GetById: function (personId) {
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
            },
            error: {
                Save: function (error) {
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
                        console.log('Error Caught', error);
                        errorObjectStore.add(customError);
                    }
                },
                Get: function () {
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
            },
            location: {
                Save: function (location) {
                    var request = indexedDB.open(pathConst.dbName, pathConst.dbVersion);
                    request.onsuccess = event => {
                        const db = event.target.result;
                        var locaitonObjectStore = db.transaction(pathConst.dataStore.location, pathConst.readwrite)
                            .objectStore(pathConst.dataStore.location);

                        var locationData = {
                            Date: location.timestamp,
                            Coords: {
                                'accuracy': location.coords.accuracy,
                                'latitude': location.coords.latitude,
                                'longitude': location.coords.longitude
                            }
                        };

                        locaitonObjectStore.add(locationData);
                    }
                }
            },
            participant: {
                participantApi: `${baseUrl}/scout/~api/participant`,
                getRemote: function () {
                    var self = this,
                        param = {
                            params: {
                                securityToken: store.getters.Token,
                                page: 1,
                                start: 0,
                                limit: -1
                            }
                        };

                    return axios.get(self.participantApi, param);
                },
                getLocal: function () {

                }
            }
        };
    }
};

export default PathData;
