# Frontend Coding Challenge - Instruments Watch List

Hello team! Here is my solution to the challenge.
Feel free to contact me if there are some questions: ialekseev93@gmail.com

## Using this application

### Pre-requisites

Please make sure to have [Node](https://nodejs.org) 16 installed.

### Running the code

Once you have unzipped the folder and are ready to start, you can run `yarn` (or `npm install`) to install dependencies. After that, you can run:

```bash
# npm
npm run dev

# or yarn
yarn dev
```

This will start the application in development mode. It will also start the WebSocket server on port 8425.

You can see the client application running in your browser by going to http://localhost:3000.

---

## Dependencies

The following packages are used in the app:

1. `React`
2. `React Hook Form` - for all form-related things including validation
3. `clsx` - utility for constructing className strings
4. `lodash.difference` and `lodash.throttle` - utilities from lodash

---

## Folder structure

The app has the following folders:

1. `components` - shared components that can be used on all pages. Initial components were slightly styled for mobile version of the app. Layout component was added
2. `models` - TypeScript models for entities used in the app
3. `pages` - page components and specific components and hooks for them
4. `services` - services used in the app (for example wrapper for WebSocket)

## Services

The WebSocket service used in the app is a wrapper for WebSocket Web API with a useful API methods specific for the app.

## Questions

1. What happens in case the WebSocket disconnects? How would you go further to keep
   the live data available or inform the user? Please discuss the challenges.

- I think a good solution would be to show the user a warning that they might be looking at stale data and try to reconnect WebSocket connection in the background. Probably we should do it 3-5 times with exponentially growing period. If WebSocket reconnects then we hide the warning. If all the tries are used and WebSocket doesn't reconnect we should show an error message with possible solutions: for example to reload the page, check internet connection or write to the customer support.

2. What happens if a user adds an instrument multiple times to their list? Please discuss possible challenges and mitigations.

- We should validate if the instrument was already added to the watch list and notify the user about it. We could also focus on already added instrument in the list to help the user search for the instrument if the list is long. If the question is about adding several different instruments, the problem is about showing them on mobile screen because if there are many of them then when you scroll the page then the input disappears and you need to scroll back to type a new ISIN. I solved this by fitting the layout on one page and adding scroll to the watch list container on mobile version.

3. What potential performance issues might you face when this app scales with multiple subscriptions? How would you improve the speed and user experience?

- When there are multiple subscriptions then the UI will change very often and can be slow in the end. I think a good solution is to throttle update of the state to reduce the intensity of updates. Also we could batch state updates for all subscriptions so that new prices are rendered simultaneously. Another performance improvement is a virtualized list or loading watch list cards on demand as user scrolls.

---

## Improvements:

1. I have used `React Hook Form` to manage forms and their validation. For such a small app this is an overkill. We could use native HTML5 validation, but I don't have experience with it, so I decided to go with the reliable solution. Also it would be easier to scale the app with the library because you would have to write a React wrapper for native validation anyway.
2. Currently I use WebSocket service right in the component. I could instead instantiate the connection in the provider and pass it down to the components with context and a hook for subscription.
3. Virtualization of the watch list.
4. For variables like WS_URL we could use ENV files for different environments.
5. We could store the list of subscriptions in local storage or in DB on backend.
6. Additional unit tests - for example for hooks and services.
7. For this app I used a simple folder structure but I personally prefer module-based approach when you divide your app into entities and separate them into own folders where models, actions, store, API and views are located.
