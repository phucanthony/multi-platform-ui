import 'babel-polyfill';
import React from 'react';
import { AppRegistry } from 'react-native';
import { AppContainer } from 'react-hot-loader';

import app from './src';
import { store } from './src/store';
import * as appActions from './src/store/action/app';

const render = (Component) => {
	setTimeout(() => {
		const App = () => {
			return <AppContainer store={store}>
				<Component/>
			</AppContainer>;
		};

		AppRegistry.registerComponent('App', () => App);
		AppRegistry.runApplication('App', {
			initialProps: {},
			rootTag: document.getElementById('root'),
		});
	}, 0);
};

render(app);

if (module.hot) {
	module.hot.accept('./src', () => {
		const nextApp = require('./src').default;
		render(nextApp);

		/* Beautiful workaround:
		 Force update unrelated modules in the next execution loop.*/
		setTimeout(() => store.dispatch(appActions.increaseCounter()), 0);
	});
}

if (process.env.NODE_ENV !== 'production') {
	console.log("%cHey, we have a challenge!", 'font-size:14px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);');
	console.log("%cA hidden secret is waiting for you, however.. only genius could find and solve it ¯\\_(ツ)_/¯", 'font-size:15px;');
}