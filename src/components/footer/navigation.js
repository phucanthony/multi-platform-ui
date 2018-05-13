import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { push } from 'react-router-redux';

import { connect } from 'react-redux';

import Interpolate from '../interpolate';

import { colors } from '../../utils'

type Props = {
  configs ?: Object,
  signUpHeight ?: number
};

@connect(() => ({}))

export default class FooterNavigation extends Component {
  props: Props;

  renderContactSection = () => {
    return <View style={[styles.sectionContainer, styles.textSection, { paddingTop: this.props.signUpHeight / 2 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>CONTACT</Text>
        <Text style={styles.normalText}>{this.props.configs.contact.tel}</Text>
        <Text style={styles.normalText}>{this.props.configs.contact.mail}</Text>
      </View>
    </View>
  }

  renderLogoSection = () => {
    return <View style={[styles.sectionContainer , { paddingTop: this.props.signUpHeight / 2 }]}>
      <Text style={styles.companyText}>inUS VIET NAM</Text>
      <Interpolate
        template={this.props.configs.copyright} sources={this.props.configs}/>
    </View>
  }

  onNavigate = (uri) => {
    window.scrollTo(0, 0);
    this.props.dispatch(push(uri))
  }

  renderNavigationSection = () => {
    return <View style={[styles.sectionContainer, styles.textSection, { paddingTop: this.props.signUpHeight / 2 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>NAVIGATION</Text>
        {this.props.configs.navigation.map((item, index) => {
          return <Text
            onPress={() => this.onNavigate(item.uri)}
            key={index}
            style={styles.normalText}
          >
            {item.title}</Text>
        })}
      </View>
    </View>
  }

  render () {
    return <View style={styles.footerContainer}>
      {this.renderContactSection()}
      {this.renderLogoSection()}
      {this.renderNavigationSection()}
    </View>
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    backgroundColor: '#33363E',
    flexDirection: 'row',
    paddingBottom: 50
  },
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    marginTop: 20
  },
  textSection: {
    justifyContent: 'flex-start'
  },
  titleText: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: colors.main,
    fontSize: 20,
    marginBottom: 20
  },
  normalText: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginTop: 10
  },
  companyText: {
    fontSize: 30,
    fontFamily: 'Vollkorn',
    fontWeight: 'bold',
    color: colors.main,
    marginBottom: 10
  }
});