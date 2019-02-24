# Project Structure

The project is located in the src folder

```
    ├───assets
    ├───components
    │   ├───global
    │   ├───login
    │   ├───logout
    │   ├───newEvent
    │   ├───patient
    │   ├───reportMyDay
    │   ├───shared
    │   └───workOffline
    ├───custom_modules
    ├───plugins
    ├───statics
    ├───tabs
    │   ├───development
    │   ├───home
    │   ├───newEvent
    │   ├───offline
    │   ├───patient
    │   ├───reportMyDay
    │   └───shared
    └───views
```
> ### Folders
>
> - **assets**  
>   these files are processed through Webpack compiler, this can include images, css or js files
> - **components**  
>   each view will have its own component folder, components are bits of  
>   reusable code or a *holder* for complex code to live without mudding up  
>   the main view file.
> - **custom_modules**  
>   modules are bits of code that can be *import*ed into views using an import  
>   statement 
> - **plugins**  
>   plugins are installed on the Vue instance object and can be used in code by:
> ``` javacript
>   window.pathVue.$[plugin_name].yourAwesomeMethod()
> ```
> - **statics**   
>   data that will not change or be modified by code this can include object, text 
> - **tabs**  
>   each view will have a folder to place tabs, views may or may not have tabs,  
>   but for the sake of uniformity we will have a place for them.
> - **views**  
>   these are the main pages the user can navigate to using routes
>    
>  **Note:** Items not to be processed by webpack can be placed  
>   in the *public* folder and still be used in code.



 