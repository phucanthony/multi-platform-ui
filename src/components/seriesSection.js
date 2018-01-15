import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import PageSection from './pageSection';
import { Style, Element } from '../typeDefinition';

type Props = {
	dark?: Boolean,
	wrapperStyle?: Style,
	innerStyle?: Style,
};

export default class SeriesSection extends Component {
	props: Props;

	render() {
		return <PageSection
			dark={this.props.dark}
			wrapperStyle={this.props.wrapperStyle}
			innerStyle={this.props.innerStyle}>
			<Text>SeriesSection</Text>
		</PageSection>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
	},
});