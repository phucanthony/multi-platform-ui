import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, } from 'react-native';
import { connect, Button, } from 'react-universal-ui';

import Layout from '../../components/layout';
import ColumnSection from '../../components/columnSection';
import particleJs from '../../components/particle';
import { interpolate, siteConfigs, baseStyles } from '../../utils';
import InformationPanel from './information';

type Props = {
	dispatch?: Function,
  pageScrollOffset?: {
    x: Number,
    y: Number,
  },
};

@connect(({ app }) => {
	return {
		counter: app.counter,
    pageScrollOffset: app.pageScrollOffset
	};
})

export default class HomeScene extends Component {
	props: Props;

	componentDidMount() {
		particleJs('particle-header', require('./particles-light.json'));
	}

	render() {

		const homeConfigs = siteConfigs.home,
			backgroundPositionInterpolate = interpolate(this.props.pageScrollOffset.y, {
				inputRange: [0, 500],
				outputRange: [0, 100]
			}),
			backgroundPosition = this.props.pageScrollOffset.y > 500 ? 100 : backgroundPositionInterpolate,
			imageStyle = {
        backgroundPosition: `0 ${backgroundPosition}%`
		};

		return <Layout home style={styles.container}>
			<View style={styles.container}>
        <View id="particle-header" style={[styles.headingContainer, imageStyle]}/>
				<View style={styles.underImage}/>
        <InformationPanel homeConfigs={homeConfigs}/>
			</View>

			<ColumnSection
				wrapperStyle={{ borderTopWidth: 0, }}
				configs={homeConfigs.whySection}/>

			<ColumnSection
				wrapperStyle={styles.darkSectionWrapper}
				configs={{ dark: true, title: 'DARK SECTION' }}/>

			<ColumnSection
				wrapperStyle={styles.redSectionWrapper}
				configs={{ dark: true, title: 'DARK SECTION' }}/>
		</Layout>;
	}
}

const headingTextStyles = {
		...baseStyles.text,	color: '#ffffff', fontWeight: '300', textAlign: 'center',
	},
	buttonWidth = 150,
	buttonRadius = 3;

const styles = StyleSheet.create({
	container: {
		height: 1200,
		backgroundColor: '#DFDFE5',
		alignItems: 'center',
		width: '100%'
	},
	headingContainer: {
		height: 800, alignItems: 'center', justifyContent: 'flex-end',
		backgroundImage: "url('img/home_image.jpg')",
		backgroundSize: 'cover',
		backgroundPosition: '0 0%',
		backgroundRepeat: 'no-repeat',
		width: '100%'
	},
  underImage: {
		width: '100%',
		height: 400,
    backgroundImage: "url('img/ao_dai.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: '50% 0%',
    backgroundRepeat: 'repeat',
	}
});