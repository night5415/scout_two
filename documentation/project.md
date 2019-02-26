### **Main.js**
The entry point into the project, here the Vue instance is created and all the plugins are  
added, 
- router
- store
- vuetify
- custom plugins 
### **App.vue**
Is the main *view* and can be considered a **Master** page or sort and anything components  
added here will be accessible site wide. 
### **PathStore.js**
A store is a single source of truth, or data tha can be accessed by all views and if/when data  
is changed, that change will affect all.
### **Router.js**
The router is what tells the app where to go when the user causes a navigation event, we can add  
specific logic per view or where we can add authorization based on permissions. 
### **/views/Sandbox.vue**
This is a view which was added to test the environment, during developments you may want to add bits  
of code to see what happens, this would be the place to do that!
### **/custom_modules/PathData.js**
This is our main entry point for retrieving data, since our app will need to run in offline mode we need  
a central location for making that switch happen in a uniform and repeatable fashion. The cacheFirst method   
checks the local DB first and returns these records in the provided component data property, it then pulls back  
participants using the legacy Scout call and caches that data in the localDb and also updates the records used by  
the UI so they are no longer stale. 
### **/custom_modules/PathApi.js**
I see this module as a place to locate our server calls which can then be consumed by other parts of the app,  
orginally (2/24/2019) I envisioned an instantiatable class where we could then call instatance methods but the complexity  
so far seems to outweigh any benefit. 
### **/plugins/PathDb.js**
//need to add
### **/plugins/PathFilter.js**
//need to add
### **/plugins/PathLocation.js**
//need to add
### **/plugins/PathUtil.js**
//test
