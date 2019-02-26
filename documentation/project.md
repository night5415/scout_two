### **Main.js <small>[(file)](../src/Main.js)</small>**
The entry point into the project, here the Vue instance is created and all the plugins are  
added, 
- router
- store
- vuetify
- custom plugins 
### **App.vue <small>[(file)](../src/app.vue)</small>**
Is the main *view* and can be considered a **Master** page of sorts where any component or markup  
added here will be accessible/rendered app wide. 
### **PathStore.js <small>[(file)](../src/PathStore.js)</small>**
PathStore is an instance of [Vuex](https://vuex.vuejs.org/) and is a single source of truth for the app. For data that  
 can be accessed by all views, components and *backend* code. if/when data is changed, that change will affect all consumers of that data.
### **Router.js <small>[(file)](../src/Router.js)</small>**
The router is what tells the app where to go when the user causes a navigation event, we can add  
specific logic per view or where we can add authorization based on permissions. 
### **Navigation <small>[(file)](../src/components/global/PathNavigation.vue)</small>**
Navigation is handled by a global component using a [Vuetify](https://vuetifyjs.com/en/components/navigation-drawers#navigation-drawer)
navigation drawer
### **/views/Sandbox.vue <small>[(file)](../src/views/Sandbox.vue)</small>**
This is a view which was added to test the environment, during developments you may want to add bits  
of code to see what happens, this would be the place to do that!
### **/custom_modules/PathData.js <small>[(file)](../src/custom_modules/PathData.js)</small>**
This is our main entry point for retrieving data, since our app will need to run in offline mode we need  
a central location for making that switch happen in a uniform and repeatable fashion. The cacheFirst method   
checks the local DB first and returns these records in the provided component data property, it then pulls back  
data using the legacy Scout calls and caches that data in the localDb and also updates the records used by  
the UI so they are no longer stale. 
### **/custom_modules/PathApi.js <small>[(file)](../src/custom_modules/PathApi.js)</small>**
I see this module as a place to locate our server calls which can then be consumed by other parts of the app,  
orginally (2/24/2019) I envisioned an instantiatable class where we could then call instatance methods but the complexity  
so far seems to outweigh any benefit. 
### **/plugins/PathDb.js <small>[(file)](../src/plugins/PathDb.js)</small>**
This plugin is where where our [PouchDB](https://pouchdb.com/) code is located. Again we need a central location where CRUD operations  
can occur reliably, as data being saved to local DB's must be encrypted by default. Exceptions are not being encrypted by passing setting  
unprotected = true;. 
### **/plugins/PathFilter.js <small>[(file)](../src/plugins/PathFilter.js)</small>**
[Filters](https://vuejs.org/v2/guide/filters.html) are bits of code that can be used by Vue to manipulate or format data. These are **Global** filters that can be  
 used app wide. It's also possible to add filters to an individual component or view if that filter is very specific and will only  
 be used in one locations.
### **/plugins/PathLocation.js <small>[(file)](../src/plugins/PathLocation.js)</small>**
This plugin adds location data to our Vue object, we might think about removing this as a plugin in the future if we only save location data  
to our local DB, but I felt that this might give us more reusability in the future.
### **/plugins/PathUtil.js <small>[(file)](../src/plugins/PathUtil.js)</small>**
This plugin is more of a catch all place to put code that can be useful but doesn't necessarily fit into an existing bucket. 
