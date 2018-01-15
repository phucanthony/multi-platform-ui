import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import Layout from '../../components/layout';

type Props = {

};

export default class JoinUs extends Component {
	props: Props;

	render() {
		return <Layout style={styles.container}>
			<Text>JoinUs</Text>
		</Layout>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, alignItems: 'center', justifyContent: 'center',
	},
});