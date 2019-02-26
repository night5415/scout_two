# Magic Strings (constants)
To get away from having strings littered throughout the code and have a bit of uniformity like Pathfinders translation file, add text to the [Const](../src/statics/PathConstants.js) file. Please check current usage before adding new strings and be mindful of what namespace the text is located under for easy lookup later.
``` javascript
import { dataStore } from "@/statics/pathConstants";

function(){
    let my_string = dataStore.participant;
    //my_string = "participant"
}
``` 
# Add a custom component
Add a new vue template in the proper directory based on where the component will be used.

 - /src/components/global/myCoolComponent.vue&nbsp;&nbsp;&nbsp;&nbsp;//used througout the app
 - /src/components/&nbsp;*{view}*&nbsp;/myCoolComponent.vue&nbsp;&nbsp;&nbsp;//view specific
 - /src/components/shared/myCoolComponent.vue&nbsp;&nbsp;&nbsp;//used on multiple views
 
add an import statement of the new componenet to the view where it will be used.
``` javascript
import myCoolComponent from "@/components/login/myCoolComponent";
```
Add the new component to the export defaults components object property
``` javascript
components: { myCoolComponent }
```
Use the new component in the .vue template as an HTML tag
``` html
<myCoolComponent/>
```
# Database
**CRUD** operations are handle in our [PathDb](../src/custom_modules/PathDb.js) file which exposes certain functions or properties  
on our window.pathVue.$pathPouch object.

    - saveOrUpdate(obj) //saves or updates a document (encrypted)
    - save(obj)         //saves a new document (will throw an error if the document already exists)
    - getById(obj.Id)   //returns the record with the specifid ID (decrypted)
    - getAll()          //returns all documents in the DB
    - getRowCount()     //current record count
    - _db               //underlying database
  
All data will be encrypted by default but can be turned off at the DB level by setting the DB  
property *unprotected* to false, currently only app excetions are saved unencrypted. This file is  
run on app startup and will create/update DB's as needed, all future DB's will need to be added following  
the same pattern as the **participants** and **login** DB's.  
# Local API
Since our app will need to run offline, our local [API](../src/custom_modules/PathData.js) will handle calls intellegently based on network connectivity. I have setup 3 generic functions that will pull data in different manners. All calls are promise based. 

- cacheFirst
- networkOnly
- cacheOnly

As the names suggest, cacheFirst will check the local DB first and place these documents into an array property on the supplied components data object (defaults to *dataList*).  

We also have the ability to show progress using another property on the supplied component with the *dataProgress* property. 
``` javascript
//which api you need to use, add as an import.
import { participantApi } from "@/custom_modules/PathData";
export default {
  data() {
    return {
      dataList: [],  
      dataProgress: 0, 
    };
  }, 
  methods: {
    loadData() {
      var self = this; 
      participantApi // <- what api to call ??
        .cacheFirst(self)
        .finally(function() {
             // data will be added to the dataList prop above, handle
             // any action that must happen regardless of outcome here.
        })
        .catch(err => {
            // errors will be saved to the exceptions DB
            // automatically, handle view level stuff here
        });
    }
  }
} 
```
# Global Object
The Vue instance can accessed
```javascript
let VueInstance = window.pathVue || pathVue; //main Vue instance
```
# Notifications
To display a notification or *Are you sure* dialog, pass in a config object with title, body, accept, decline. Accept button will default to *Accept*, omitting decline will not display the button. 
```javascript
pathVue.$pathComponents
        .Confirm({
          title: "{string}",
          body: "{string}",
          accept: "{string}", 
          decline: "{string}"  
        })
        .then(e => {
          if (e) {
            self.$pathUtil.LogOut();
          }
        });
```
# Toast
To display a simple Toast notification which will go away after 3 seconds
```javascript
let message = "What should I say?";
pathVue.$pathComponents.Snack(message);
```

  
  