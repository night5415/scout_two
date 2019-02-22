import { api } from "@/custom_modules/PathApi";

const participantApi = {
    /**
     * @param {VueComponent} comp The component which the call is comming from 'This'
     * @param {string} dataProp An Array data property located on the component 
     */
    cacheFirst: (comp, dataProp) => {
        return _private.cache("participant", comp, dataProp, true)
            .then(() => {
                return _private.service(comp, dataProp);
            })
            .catch((err) => {
                debugger;
                console.error('PathData', err);
            })
            .finally(() => {

            });
    },
    networkOnly: () => {

    },
    cacheOnly: (dataOnly) => {

    }
}

const login = {

}

export { participantApi, login };

const _private = {
    /**
    *  @param {DataBase} db What local database are we looking at? (required)
    *  @param {VueComponent} comp The component which the call is comming from 'This'. (required)
    *  @param {string} [dataProp] the data property in which to place records in. (defaults to dataList)
    *  @param {string} [progress] the data property in which to set our progress int value. (defaults to dataProgress)
    *  @param {bool} [dataOnly] return just data or the whole pouch document. (defaults to false)
    */
    cache: function () {
        var db = arguments[0],
            comp = arguments[1],
            prop = arguments[2] || 'dataList',
            progress = arguments[4] || 'dataProgress',
            dataOnly = arguments[3] || false;

        if (!db)
            Promise.reject('Datebase Name is required');

        if (!comp)
            Promise.reject("Vue component is required");

        comp[progress] = 10;

        return pathVue.$pathPouch[db].getAll()
            .then(function name(documents) {
                documents.rows.forEach(document => {
                    let documentOrData = dataOnly ? document.doc.data : document;
                    if (documentOrData) {
                        documentOrData.Cached = true;
                        comp[prop].push(documentOrData);
                    }
                });
                comp[progress] = 50;
                return Promise.resolve(true);
            })
    },
    /** 
    *  @param {VueComponent} comp The component which the call is comming from 'This'. (required)
    *  @param {string} [dataProp] the data property in which to place records in. (defaults to dataList)
    *  @param {string} [progress] the data property in which to set our progress int value. (defaults to dataProgress) 
    */
    service: function () {
        let comp = arguments[0],
            prop = arguments[2] || 'dataList',
            progress = arguments[4] || 'dataProgress',
            _api = new api('https://test-lighthouse.abpathfinder.net'),
            participant = _api.participant;

        if (!comp)
            Promise.reject('Vue Component is required');

        return participant
            .then(response => {
                if (response && response.status === 200) {
                    let data = response.data;
                    if (data.success) {
                        let records = data.data;
                        if (records.length > 0) {
                            comp[progress] = 60;
                            records.forEach(record => {
                                var currentRecord = comp[prop].find((data) => {
                                    return (data && record) && (record.Id === data.Id);
                                });
                                if (currentRecord) {
                                    currentRecord.Cached = false;
                                } else {
                                    record.Cached = false;
                                    comp[prop].push(record);
                                }
                            });
                            comp[progress] = 95;
                            Promise.resolve(true);
                        } else {
                            //no records
                            Promise.reject("No records found for participant");
                        }
                    } else {
                        //call not successful
                        Promise.reject(
                            `Server returned a status of ${response.status}`
                        );
                    }
                }
            })
    }
}

