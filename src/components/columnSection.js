import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { connect } from 'react-universal-ui';

import Icon from './vector-icons/EvilIcons';

import PageSection from './pageSection';
import { baseStyles, interpolate } from '../utils';
import { Style, Element } from '../typeDefinition';

type Props = {
	wrapperStyle?: Style,
	innerStyle?: Style,
	itemComponent?: Function,
	configs?: {
		dark?: Boolean,
		title?: String | Element,
		wowDelay?: Number,
		columns?: Array<Object>,
	},
	dimensions ?: Object
};

@connect(({ app }) => {
	return {
		dimensions: app.dimensions
	}
})

export default class WhySection extends Component {
	props: Props;

	render() {
		const configs = this.props.configs || {},
			columns = configs.columns || [],
			wowDelay = configs.wowDelay || 0.5,
			ItemComponent = this.props.itemComponent || DefaultItemComponent;

		return <PageSection
			dark={configs.dark}
			wrapperStyle={[styles.container, this.props.wrapperStyle]}
			innerStyle={[styles.innerContainer, this.props.innerStyle]}
			title={configs.title}>
			{columns.map((column, i) => {
				return <ItemComponent dimensions={this.props.dimensions} key={i} instance={column} index={i} wowDelay={wowDelay}/>;
			})}
		</PageSection>;
	}
}

type DefaultItemComponentProps = {
	index?: Number,
	instance?: Object,
	wowDelay?: Number,
	dimensions ?: Object
}

function DefaultItemComponent({ instance, index, wowDelay = 0.5, dimensions }: DefaultItemComponentProps) {
	const window = dimensions.window || {},
		windowWidth = window.width || 1440,
		delay = `${index * wowDelay}s`,
		overrideStyles = {
			marginLeft: index === 0 ? 0 : 20,
		}, descriptionStyles = {
      paddingHorizontal: interpolate(windowWidth, {
      	inputRange: [750, 1440],
      	outputRange: [0, 80]
      })
		}

	return <View
		className="wow fadeIn" data-wow-delay={delay}
		style={[styles.sectionColumnContainer, overrideStyles]}>
		{instance.icon && <Icon style={styles.columnIcon} name={instance.icon}/>}

		{instance.heading && <Text style={styles.columnHeadingText}>
			{instance.heading}</Text>}
    <View style={descriptionStyles}>
      {instance.description && <Text style={styles.columnDescriptionText}>
        {instance.description}</Text>}
    </View>
		<View style={styles.borderSection}/>
	</View>;
}

const styles = StyleSheet.create({
	container: {

	},
	innerContainer: {
		flexDirection: 'row'
	},
	sectionColumnContainer: {
		flex: 1, minWidth: 200,
		paddingHorizontal: 10,
		marginBottom: 30,
    backgroundColor: '#E7E9EE',
		paddingVertical: 10,
		paddingTop: 20,
		paddingBottom: 50,
		alignItems: 'center'
	},
	columnIcon: {
		fontSize: 75, textAlign: 'center', marginBottom: 18, color: '#6DB7B3'
	},
	columnHeadingText: {
		...baseStyles.text, fontSize: 18, fontWeight: '600',
		textAlign: 'center', marginBottom: 30, color: '#6DB7B3'
	},
	columnDescriptionText: {
		...baseStyles.text, textAlign: 'center', fontSize: 14, lineHeight: 30
	},
	borderSection: {
		position: 'absolute',
		bottom: 20,
		width: '70%',
		height: 4,
		marginTop: 30,
		borderRadius: 5,
		backgroundColor: '#6DB7B3'
	}
});