import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../utils'

type Props = {
  configs ?: Object
}

export default class Step extends Component {
  props: Props;

  renderTitle = () => {
    return <View className="wow fadeInUp" style={{ width: '100%' }}>
      <Text style={styles.title}>{this.props.configs.title}</Text>
      <Text style={styles.subtitle}>{this.props.configs.subtitle}</Text>
    </View>
  }

  render () {
    return <View style={styles.container}>
      <View style={styles.innerContainer}>
        {this.renderTitle()}
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    backgroundImage: "url('img/together.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    top: 0,
    left: 0
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: colors.main,
    fontSize: 40,
    marginTop: 30
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Lato',
    color: 'black',
    fontSize: 25,
    marginTop: 10
  }
});