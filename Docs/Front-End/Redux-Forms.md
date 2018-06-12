# Redux Forms

# Redux Architecture

Redux is an application state managing library, mainly used with (but not limited to) React and Angular, which helps developers achieve unidirectional data flow

![](https://d2mxuefqeaa7sj.cloudfront.net/s_DAD78948C1570F62ECC4CDC6F2DD2A0B7BF8AFF300192B4EDCC181C6BF2853C6_1521712230474_redux_architecture.png)


With Redux, the container components are responsible for creating actions, which in turn are dispatched to the corresponding reducers. This actions can be modified by one or more middlewares, such as *thunk* (facilitates async api requests), in order to achieve an higher logical complexity. These actions are decomposed in the correspondent reducers, in order to make the necessary data changes to the state, saving the the current state and producing the new state, as follows:


  - action → reducer (action, previousState) → (previousState, nextState)
  

With this, redux produces a new state every time the reducer changes it. This new state is then passed on as props to the container component, in order to change the presentational component’s data, shown to the user.


# Forms and Form State Management Library

Forms are used throughout our application in order to achieve several important actions (creating an account, authenticating, registering a vehicle, editing the user’s profile,…). The information introduced by the user onto the corresponding form inputs need to be stored somewhere, since every time the user changes the input’s value, the presentational component needs to re-render this new information. This can be accomplished using the component’s state, or, since we are using Redux to manage our application’s states, our form usage, in order to comply with Redux’s logic.

Without any kind of library (e.g. redux-form), we have to implement the redux’s logic onto our form component, i.e. implement an event handler for each input that dispatches an action creator(s), and the reducer(s) that will process those action(s). 
Things like validation (which is not natively built in onto react) and error handling also have to be developed *in-house.* 

Pros of forms with  form state management library:

- it keeps track of all common form state, such as:
  - the fields that are in the form
  - the values of each field
  - the focused field
  - if the field values are valid
  - the fields that the user has interacted with
  - if the form is being submitted
  - if is happening any asynchronous validation

Problems with form state management library:

- (redux-form) calls the entire reducer stack multiple times on each keystroke (ok with small forms, bad with big ones) (solved on V6)
- can be complex in unnecessary ways
# Redux Store vs React State
https://github.com/reactjs/redux/issues/1287


[reactjs/redux#1287](https://github.com/reactjs/redux/issues/1287)
 
With further investigation, the question arose between using the Redux’s store for saving our form state, or saving it on the component’s state itself. Both inventors of Redux seem to agree that you shouldn’t use its store to save temporary data that is irrelevant to the app globally and doesn’t mutate in complex ways. If we needed to sync the form state with another page, for example, then it should be using the store for that, otherwise it doesn’t need the extra complexity.


# Form State Management Libraries

**Redux-form** https://github.com/erikras/redux-form

- Pros:
  - Only re-renders components that have changed instead of re-rendering the entire form (since V6)


- Cons:
  - Dependency on redux
  - Unnecessary complexity if you just want a local form with no global ramifications
****
**Formik** https://github.com/jaredpalmer/formik

- Pros:
  - Fewer open issues than redux-form
  - Smaller than redux-form


- Cons:
  - Dependency on Yup for validation https://github.com/jquense/yup

**React-final-form** https://github.com/final-form/react-final-form

- Pros:
  - Evolution on redux-form (same author), but without the redux part
  - Uses observer pattern so that only components that changed are re-rendered
  - Zero dependencies. Has 2 peer dependencies: React and Final Form(.js library)
  - Smallest of all


- Cons:
  - Recent project (4 months old)


# Review

From what I’ve investigated, I think we should use one of the redux independent libraries to manage most of our application form’s states, since these are mainly going to have local impact, rather than affecting the global state of the application. Nevertheless, I believe we should use some kind of library, saving us time in implementing the necessary features in order to achieve a correct form handling, i.e., transforming props into form state, validation and error messages, form submissions. 

Links:
https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8
https://goshakkk.name/should-i-put-form-state-into-redux/
https://matwrites.com/redux-form-is-dead/
https://hackernoon.com/painless-react-forms-with-formik-e61b70473c60
https://codeburst.io/final-form-the-road-to-the-checkered-flag-cd9b75c25fe

