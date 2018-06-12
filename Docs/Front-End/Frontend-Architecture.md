# Frontend Architecture
This application was generated using create-react-app command, and it takes advantage of its ecosystem. You can use *yarn* or *npm* as a package manager, however we’ve used *yarn* since the beginning.

To start the application you have to install the dependencies and run it in the dev environment:


    $ yarn install # install the dependencies listed on package.json
    $ yarn start   # run the app in the development mode


## Folder Structure

The code is inside of /src folder.

- /api
  - code that exposes the RESTful API (backend) to JS methods
  - each resource must have a different file
  - the api-manager.js is responsible to configure ‘axios’ (our http client lib) with things like auth headers, interceptors, and more.
- /components
  - the ‘dumb’ react components
  - this components should not access the redux store
  - you should not see any ‘connect’ here. If you do, please move it to /containers folder 😛 
  - this components are included by the containers
  - the /ui folder contains the base UI code
    - we are using styled-components (with rebass) to do every thing related to the UI
- /containers
  - react components that are linked to the store
  - they read the data (and call actions to fetch it) from the store and pass it to the components
- /redux
  - /actions - declare functions that can be called by the containers to change the store
    - if you want to **put** or **update** anything in the redux store, the method must be present here
    - the actions will ‘dispatch’ the information that is processed/stored by the reduceres
    - since most of the data/information comes from our RESTful server, it is very likely that actions will use the api classes (those on the /api folder)
  - /middlewares
    - code that will do some magic to save us from some tedious work
    - we’ll talk in detail about this later
  - /reducers
    - code that receives the information from (any) action, and knows how to aggregate it on the redux store
    - each resource must have a different file/reducer
  - /selectors
    - this is for **reading** the data from the redux store
    - it is being used on the complex reads (de-referencing many objects at the same time), but in the future, every reading should be done recurring to a selector
    - again, each resource must have a different file/selector
- /styles
  - styled-components let you configure a theme, where you can define the main UI settings
  - this includes colours, media breakpoints (responsiveness), font-style, etc
  - since we are using other libraries that weren’t built with styled-components, there is also a CSS file here (‘custom.css’) to change their style
- /utils
  - By now, this folder only contains a file (PrivateRoute.js). Its purpose is to simplify the auth process: the client app have both auth (e.g. dashboard) and un-auth areas (e.g., search). The PrivateRoute component is responsible for checking the token and, if it does not exist, to redirect the user to the Login page
  - This folder may be complemented with some additional Components that are not related nor with the UI nor with the system’s logic
- /validations
  - helper classes/functions to help on form validation


## Middlewares

As you may notice, this app is built using the redux library. This helps a lot on managing the state of the application. However, since it forces us to be very methodic on arranging the data, the code may become very messy and confusing (and it did!).
After coding the first action and reducer files responsible for storing the data coming from the server, it became clear that there was a huge change to simplify them.
Since the server responds with JSON built according to the JSON API specification, instead of writing very complex reducers (capable of dealing with nested reducing, for example), we are using the additional metadata (“type” tag) to figure out which reducer is responsible to store each piece of data.
The ‘saveMiddleware’ is listening for ‘SAVE’ actions. When one arrives, it looks at the entries received in the payload (JSON API’s *data* & *included* resources) and indexes them by their type.
The resulting (indexed) object is then passed to the reducers.
On a single ‘SAVE’ message, each reducer (one per entity) can now easily check if there are new entities to store. In that case, it can store them by it self or by using an helper function (saveById).
This method indexes the entries by their id, and also converts the relationships into an foreign id (or an array of ids, if many).

