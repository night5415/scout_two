import PouchDB from 'pouchdb-browser';
import DbFind from 'pouchdb-find';
import SimpleCrypto from "simple-crypto-js";

var _pathConst = null,
    _participantDb = null,
    _exceptionDb = null,
    _loginDb = null,
    _crpto = null;

var pathDb = {
    remoteCouch: false,
    pathConst: null,
    install(Vue, pathConst) {
        var self = this;
        console.log('Installing PouchDb');
        _crpto = new SimpleCrypto('test');//will need to seed with password
        _pathConst = pathConst;
        self.create();
        //this exposes functions on the $pathVue.$pathPouch
        //object.
        Vue.prototype.$pathPouch = {
            login: {
                saveOrUpdate: _loginDb.saveOrUpdate,
                save: _loginFunc.save,
                getById: _loginFunc.getById,
                getAll: _loginFunc.getAll
            },
            participant: {
                saveOrUpdate: _participantDb.saveOrUpdate,
                save: _participantFunc.save,
                //bulkSave: _participantFunc.bulkSave, //this needs work because the _id needs to be set to our Id :()
                getByFirstName: _participantFunc.getByFirstName,
                getById: _participantFunc.getById,
                getAll: _participantFunc.getAll,
                export: _participantFunc.export,
                getRowCount: _participantFunc.getRowCount,
                _db: _participantDb
            },
            exceptions: {
                saveOrUpdate: _exceptionDb.saveOrUpdate,
                save: _exceptionFunc.save,
                getAll: _exceptionFunc.getAll,
                clear: _exceptionFunc.clear,
                export: _exceptionFunc.export,
                getRowCount: _exceptionFunc.getRowCount,
                _db: _exceptionDb
            }
        }
    },

    /**
     * This is the entry point for creating our local PouchDB instances 
     * PathConst is required as it holds the names of our db's
     * @param {*} pathConst
     */
    create: function () {
        //initialize DB's and add plugins
        dbConfig.init();
        //setup participant DB
        _participantDb = dbConfig.participant();
        _exceptionDb = dbConfig.exceptions();
        _loginDb = dbConfig.logins();
    }
}

var dbConfig = {
    init: function () {
        //add any plugins to ALL Db's
        PouchDB.plugin(DbFind)
            .plugin({ getRowCount: pouchPlugins.getRowCount })
            .plugin({ saveOrUpdate: pouchPlugins.saveOrUpdate });

        //add events
        PouchDB.on('created', function (dbName) {
            console.log(`db ${dbName} created`)
        });
        PouchDB.on('destroyed', function (dbName) {
            console.log(`db ${dbName} destroyed`)
        });

    },
    participant: function () {
        let self = this,
            db = new PouchDB(_pathConst.dataStore.participant);
        //Index by Id
        db.createIndex({
            index: {
                fields: ['Id']
            }
        }).then(function (result) {
            // handle result
        }).catch(function (err) {
            console.log(err);
        });

        return db;
    },
    exceptions: function () {
        let self = this,
            db = new PouchDB(_pathConst.dataStore.exceptions);

        return db;
    },
    logins: function () {
        let self = this,
            db = new PouchDB(_pathConst.dataStore.login);

        return db;
    }
}

var _loginFunc = {
    save: function (login) {
        return _loginDb.put(login);
    },
    getById: function (id) {
        return _loginDb.find({
            selector: {
                Id: id
            }
        })
            .then(docs => {
                return Promise.resolve(docs.docs[0]);
            })
    },
    getAll: function () {
        return _loginDb.allDocs({ include_docs: true });
    }
}

var _exceptionFunc = {
    getAll: function () {
        return _exceptionDb.allDocs({ include_docs: true });
    },
    save: function (exe) {

    },
    clear: function () {

    },
    export: function () {

    },
    getRowCount: function () {
        return _exceptionDb.getRowCount();
    }
}

var _participantFunc = {
    getAll: function () {
        return _participantDb.allDocs({ include_docs: true });
    },
    getById: function (patientId) {
        return _participantDb.find({
            selector: {
                Id: patientId
            }
        })
            .then(docs => {
                if (docs && docs.docs.length === 0) {
                    return Promise.resolve(undefined);
                } else {
                    let data = docs.docs[0].data,
                        decrypted = _crpto.decrypt(data, true);
                    return Promise.resolve(decrypted);
                }
            })
    },
    //Returns the first record
    getByFirstName: function (patientName) {
        return _participantDb.find({
            selector: {
                FirstName: patientName
            }
        })
            .then(docs => {
                return Promise.resolve(docs.docs[0]);
            })
    },
    bulkSave: function (patients) {
        var promise = new Promise(function (res, rej) {
            _participantDb.bulkDocs(patients).then(function (result) {
                res(result);
            }).catch(function (err) {
                rej(err);
            });
        });

        return promise;
    },
    save: function (patient) {
        return _participantDb.put(patient);
    },
    delete: function (patient) {

    },
    export: function () {

    },
    getRowCount: function () {
        return _participantDb.getRowCount();
    }
}
//these are added to each DB within their respective context
var pouchPlugins = {
    getRowCount: function () {
        var self = this;
        return self.allDocs()
            .then(rows => {
                return Promise.resolve(rows.total_rows);
            });
    },
    saveOrUpdate: function (obj) {
        var self = this;
        self.getById(obj.Id)
            .then(doc => {
                var obfus = {
                    '_id': null,
                    '_rev': null,
                    'data': null
                };
                //TODO: need to decrpt??
                if (doc) {
                    obfus._id = doc._id;
                    obfus._rev = doc._rev;
                    obfus.data = _crpto.encrypt(doc.data);
                } else {
                    obfus._id = obj.Id;
                    obfus.Id = obj.Id;
                    obfus.data = _crpto.encrypt(obj);
                }
                return self.save(obfus);
            });
    }
}

export default pathDb;