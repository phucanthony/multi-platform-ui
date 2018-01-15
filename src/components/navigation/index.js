import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect, Button } from 'react-universal-ui';
import { push } from 'react-router-redux';

import EntypoIcon from '../vector-icons/Entypo';
import { GithubIcon } from '../svgs';
import NavigationItem from './navigationItem';
import { sizes, colors, siteConfigs, iStyles, baseStyles } from '../../utils';
import { Style } from '../../typeDefinition';

type Props = {
	dispatch?: Function,
	style?: Style,
	home?: Boolean,
	pageScrollOffset?: {
		x: Number,
		y: Number,
	},
};

@connect(({ app }) => {
	return {
		pageScrollOffset: app.pageScrollOffset,
	};
})

export default class NavigationBar extends Component {
	props: Props;

	render() {
		const transparent = this.props.home && this.props.pageScrollOffset.y <= 10;

		return <View style={[styles.container, this.props.style]}>
			{this.renderLogo(transparent)}
			{this.renderNavigation(transparent)}
		</View>;
	}

	renderLogo = (transparent) => {
		const containerStyle = transparent ? {
			backgroundColor: 'transparent',
			borderColor: 'transparent',
		} : {};

		return <TouchableOpacity
			style={[styles.logoContainer, containerStyle]}
			onPress={() => { this.props.dispatch(push('/')); }}>
			<EntypoIcon name="circular-graph" style={styles.ruuiIcon}/>
			<Text style={styles.repoNameText}>{siteConfigs.siteName}</Text>
		</TouchableOpacity>;
	};

	renderNavigation = (transparent) => {
		const menuItems = siteConfigs.menus || [],
			containerStyle = transparent ? {
				backgroundColor: 'transparent',
				borderColor: 'transparent',
			} : {},
			itemTextStyle = transparent ? { color: '#ffffff', } : {},
			iconColor = transparent ? '#ffffff' : '#888888';

		return <View style={[styles.navigationContainer, containerStyle]}>
			{menuItems.map((route, i) => {
				return <NavigationItem
					key={i} route={route}
					textStyle={itemTextStyle}
					onPress={this.onNavigate}/>;
			})}
			<TouchableOpacity
				style={styles.githubIconContainer}
				onPress={() => { window.open(siteConfigs.repoUrl); }}>
				<GithubIcon color={iconColor}/>
			</TouchableOpacity>
		</View>;
	};

	onNavigate = (route) => {
		this.props.dispatch(push(route.uri));
	};
}

const edgeSpacing = 20;

const styles = StyleSheet.create({
	container: {
		position: 'fixed', zIndex: 100,
		top: 0, left: 0, right: 0,
		flexDirection: 'row',
		height: sizes.navigationHeight,
	},
	logoContainer: {
		flexDirection: 'row', alignItems: 'center',
		paddingHorizontal: edgeSpacing,
		backgroundColor: colors.main,
		borderBottomWidth: 2, borderColor: colors.lighten(colors.main, 10),
	},
	ruuiIcon: {
		fontSize: 26, color: '#ffffff',
		marginRight: 12,
	},
	repoNameText: {
		...baseStyles.text, fontSize: 18, fontWeight: '700', color: '#ffffff',
		letterSpacing: -1,
	},
	navigationContainer: {
		flex: 1, flexDirection: 'row',
		justifyContent: 'flex-end', alignItems: 'center',
		paddingRight: edgeSpacing,
		backgroundColor: '#fefefe',
		borderBottomWidth: 2, borderColor: '#dedede',
	},
	githubIconContainer: {
		marginLeft: edgeSpacing,
	},
});