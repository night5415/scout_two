import PouchDB from "pouchdb-browser";
import DbFind from "pouchdb-find";
import SimpleCrypto from "simple-crypto-js";
import { dataStore } from "@/statics/pathConstants";

var _participantDb = null,
  _exceptionDb = null,
  _loginDb = null,
  _crpto = null;

var pathDb = {
  remoteCouch: false,
  install(Vue) {
    var self = this;

    self.create();
    //this exposes functions on the $pathVue.$pathPouch
    //object.
    Vue.prototype.$pathPouch = {
      setEncryptionKey: seed => {
        _crpto = new SimpleCrypto(seed);
      },
      login: {
        saveOrUpdate: _loginDb.saveOrUpdate,
        save: _loginFunc.save,
        getById: _loginFunc.getById,
        getAll: _loginFunc.getAll,
        _db: _loginDb
      },
      participant: {
        saveOrUpdate: _participantDb.saveOrUpdate,
        save: _participantFunc.save,
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
    };
  },

  /**
   * This is the entry point for creating our local PouchDB instances 
   */
  create: function () {
    //initialize DB's and add plugins
    dbConfig.init();
    //setup participant DB
    _participantDb = dbConfig.participant();
    _exceptionDb = dbConfig.exceptions();
    _loginDb = dbConfig.logins();
  }
};

var dbConfig = {
  init: function () {
    //add any plugins to ALL Db's
    PouchDB.plugin(DbFind)
      .plugin({ getRowCount: pouchPlugins.getRowCount })
      .plugin({ saveOrUpdate: pouchPlugins.saveOrUpdate });

    //add events
    PouchDB.on("created", function (dbName) {
      //console.log(`db ${dbName} created`);
    });
    PouchDB.on("destroyed", function (dbName) {
      //console.log(`db ${dbName} destroyed`);
    });
  },
  participant: function () {
    let self = this,
      db = new PouchDB(dataStore.participant, { revs_limit: 1, auto_compaction: true });

    //Index by Id
    db.createIndex({
      index: {
        fields: ["Id"]
      }
    })
      .then(function (result) {
        // handle result
      })
      .catch(function (err) {
        console.log(err);
      });

    return db;
  },
  exceptions: function () {
    let self = this,
      db = new PouchDB(dataStore.exceptions, { revs_limit: 1, auto_compaction: true });
    db.unprotected = true;
    return db;
  },
  logins: function () {
    let self = this,
      db = new PouchDB(dataStore.login, { revs_limit: 1, auto_compaction: true });

    //Index by Id
    db.createIndex({
      index: {
        fields: ["Id"]
      }
    })
      .then(function (result) {
        // handle result
      })
      .catch(function (err) {
        console.log(err);
      });

    return db;

    return db;
  }
};

var _loginFunc = {
  save: function (login) {
    return _loginDb.put(login);
  },
  getById: function (loginId) {
    return _loginDb
      .find({
        selector: {
          Id: loginId
        }
      })
      .then(docs => {
        if (docs && docs.docs.length === 0) {
          return Promise.resolve(undefined);
        } else {
          let document = docs.docs[0];
          document.data = _crpto.decrypt(document.data, true);
          return Promise.resolve(document);
        }
      })
      .catch(e => {
        console.log('error in login get by ID', e);
      });
  },
  getAll: function () {
    return _loginDb.allDocs({ include_docs: true });
  }
};

var _exceptionFunc = {
  getAll: function () {
    return _exceptionDb.allDocs({ include_docs: true });
  },
  save: function (ex) {
    return _exceptionDb.put({
      _id: ex.Id,
      Id: ex.Id,
      data: _crpto.encrypt(ex)
    });
  },
  clear: function () { },
  export: function () { },
  getRowCount: function () {
    return _exceptionDb.getRowCount();
  }
};

var _participantFunc = {
  getAll: function () {
    return _participantDb.allDocs({ include_docs: true })
      .then(pars => {
        pars.rows.forEach(p => {
          if (p.doc.data)
            p.doc.data = _crpto.decrypt(p.doc.data, true);
        });
        return Promise.resolve(pars);
      })
  },
  getById: function (patientId) {
    return _participantDb
      .find({
        selector: {
          Id: patientId
        }
      })
      .then(docs => {
        if (docs && docs.docs.length === 0) {
          return Promise.resolve(undefined);
        } else {
          let document = docs.docs[0];
          document.data = _crpto.decrypt(document.data, true);
          return Promise.resolve(document);
        }
      })
      .catch(e => {
        console.log('error in participant get by ID', e);
      });
  },
  //Returns the first record
  getByFirstName: function (patientName) {
    return _participantDb
      .find({
        selector: {
          FirstName: patientName
        }
      })
      .then(docs => {
        return Promise.resolve(docs.docs[0]);
      });
  },
  bulkSave: function (patients) {
    var promise = new Promise(function (res, rej) {
      _participantDb
        .bulkDocs(patients)
        .then(function (result) {
          res(result);
        })
        .catch(function (err) {
          rej(err);
        });
    });

    return promise;
  },
  save: function (patient) {
    return _participantDb.put(patient);
  },
  delete: function (patient) { },
  export: function () { },
  getRowCount: function () {
    return _participantDb.getRowCount();
  }
};
//these are added to each DB within their respective context
var pouchPlugins = {
  getRowCount: function () {
    var self = this;
    return self.allDocs().then(rows => {
      return Promise.resolve(rows.total_rows);
    });
  },
  saveOrUpdate: function (obj) {
    var self = this,
      unprotected = self._db.unprotected;
    self.getById(obj.Id).then(origDoc => {
      if (origDoc) {
        origDoc.data = unprotected ? obj : _crpto.encrypt(obj);
        return self.save(origDoc);
      } else {
        return self.save({
          _id: obj.Id,
          Id: obj.Id,
          data: unprotected ? obj : _crpto.encrypt(obj)
        });
      }
    });
  }
};

export default pathDb;
