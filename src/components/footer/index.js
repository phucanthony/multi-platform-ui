import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Input, Button } from 'react-universal-ui';

import PageSection from '../pageSection';
import { siteConfigs, baseStyles, colors, interpolate } from '../../utils'
import { connect } from 'react-universal-ui/dist/index'
import FooterNavigation from './navigation'

type Props = {
	dimensions ?: Object
};

@connect(({ app }) => {
  return {
    dimensions: app.dimensions
  }
})

export default class Footer extends Component {
	props: Props;

	constructor (props) {
	  super(props);
	  this.state = {
	    name: '',
			email: '',
			signUpHeight: 0,
	  }
	}

	renderInput = (title, variable) => {
    const window = this.props.dimensions.window || {},
      windowWidth = window.width || 1440,
      inputStyles = {
        paddingHorizontal: interpolate(windowWidth, {
          inputRange: [750, 1440],
          outputRange: [10, 50]
        })
      }
		return <View style={[styles.inputContainer, inputStyles]}>
			<Text style={styles.inputTitle}>{title}</Text>
			<Input
				wrapperStyle={{ borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10 }}
				style={{ marginVertical: 5, fontSize: 20 }}
				underlineStyle={{ backgroundColor: colors.main, height: 3 }}
				onChangeText={text => this.setState({ [variable]: text })}
				value={this.state[variable]}
			/>
		</View>
	}

	renderSignUpButton = () => {
		return <TouchableOpacity
			onLayout={e => this.setState({
				signUpHeight: e.nativeEvent.layout.height,
			})}
			style={{ flex: 1, backgroundColor: colors.darken(colors.main, 10),
				justifyContent: 'center', alignItems: 'center', maxWidth: 100 }}
		>
			<View style={[styles.buttonTextContainer, { width: (this.state.signUpHeight)}]}>
				<Text style={styles.buttonText}>SIGN UP</Text>
			</View>
		</TouchableOpacity>
	}

	renderSignUp = () => {
		return <View className="wow bounceInUp" style={[styles.signUpContainer, { top: 300 - this.state.signUpHeight / 2 }]}>
			{this.renderInput('YOUR NAME', 'name')}
      {this.renderInput('YOUR EMAIL', 'email')}
			{this.renderSignUpButton()}
		</View>
	}

	render() {
		const footers = siteConfigs.footer || {};
		return <View style={{ width: '100%', alignItems: 'center' }}>
      <PageSection wrapperStyle={styles.imageContainer}/>
			<FooterNavigation configs={footers} signUpHeight={this.state.signUpHeight}/>
			{this.renderSignUp()}
		</View>
	}
}

const styles = StyleSheet.create({
	imageContainer: {
		paddingVertical: 20,
		backgroundImage: "url('img/footer_image.jpg')",
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		height: 300,
		width: '100%'
	},
	innerContainer: {
		flexDirection: 'row',
	},
	licenseContainer: {
		flex: 1, alignItems: 'flex-end',
	},
	signUpContainer: {
		width: '80%',
		backgroundColor: '#fff',
		position: 'absolute',
		top: 280,
		flexDirection: 'row'
	},
	inputContainer: {
		flex: 1,
		marginVertical: 30
	},
	inputTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.main,
		fontFamily: 'Lato'
	},
	buttonTextContainer: {
		transform: [{ rotate: '-90deg' }],
		alignItems: 'center',
		position: 'absolute'
	},
	buttonText: {
		fontFamily: 'Lato',
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white'
	}
});