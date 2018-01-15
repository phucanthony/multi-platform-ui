import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { utils, connect, ContextProvider, Modal, Snackbar, Dropdown, } from 'react-universal-ui';
import { Switch, Route, StaticRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import HomeScene from './scenes/home';
// import Blog from './scenes/blog';
import OurProductScene from './scenes/ourProducts';
import AboutScene from './scenes/about';
import JoinUsScene from './scenes/join';
import NotFoundScene from './scenes/notFound';

import { store } from './store';
import { history } from './store/reducers';
import * as appActions from './store/action/app';

type Props = {
	ssrLocation?: string,
	ssrContext?: Object,
	counter?: string,
	dispatch?: Function,
};

@connect(({ app }) => {
	return {
		counter: app.counter,
	};
})

class App extends Component {
	props: Props;

	componentDidMount() {
		window.addEventListener('scroll', this.onPageScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onPageScroll);
	}

	render() {
		const Router = utils.isServer ? StaticRouter : ConnectedRouter,
			routerProps = utils.isServer ? {
				location: this.props.ssrLocation,
				context: this.props.ssrContext,
			} : { history, };

		return <View style={styles.container}>
			<Router {...routerProps}>
				<Switch>
					<Route exact path="/" component={HomeScene}/>
					{/*<Route exact path="/blog" component={BlogScene}/>*/}
					<Route path="/our-product" component={OurProductScene}/>
					<Route path="/about" component={AboutScene}/>
					<Route path="/join-us" component={JoinUsScene}/>
					<Route component={NotFoundScene}/>
				</Switch>
			</Router>

			<Modal/>
			<Dropdown/>
			<Snackbar/>
		</View>;
	}

	onPageScroll = () => {
		const supportPageOffset = window.pageXOffset !== undefined,
			isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat'),
			scroll = {
				x: supportPageOffset ? window.pageXOffset : (isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft),
				y: supportPageOffset ? window.pageYOffset : (isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop),
			};

		this.props.dispatch(appActions.setPageScrollOffset(scroll));
	};
}

type ContainerProps = {
	ssrLocation?: string,
	ssrContext?: Object,
};

export default function AppContainer(props: ContainerProps) {
	return <ContextProvider store={store}>
		<App ssrLocation={props.ssrLocation} ssrContext={props.ssrContext}/>
	</ContextProvider>;
}

const styles = StyleSheet.create({
	container: {

	},
});