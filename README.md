This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## App:

### `Save`

The relevant elements of the state are automatically saved to the localStorage when closing the app. And restored when opening it again.

There is a save and a load button that can also be used to save the relevant parts of the state, on a different save.

### `Offline`

The app uses a serviceWorker to allow a total offline usage of the App, as long as it was loaded at least once.

### `Accepted format`

Instead of using the in-app inputs to add data entries, it is also possible to import .csv version of the tables.

CSV export of [this sheet](https://docs.google.com/spreadsheets/d/1UKT38_RUa3MQ_HEGtWgaPKvedD35wYksaj7-T0sc9N8/edit?usp=sharing).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run deploy`

Deploys the app to github.io.<br />
Open [https://thanhdodeur.github.io/marche-noel/](https://thanhdodeur.github.io/marche-noel/) to view the deployed version.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
