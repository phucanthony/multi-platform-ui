import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../../../utils'

type Props = {
  configs ?: Object
}

export default class Step extends Component {
  props: Props;

  constructor (props) {
    super(props);
    this.state = {
      activeStep: 0,
      phoneOpacity: new Animated.Value(1)
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.activeStep !== nextState.activeStep) {
      this.playAnimation();
    }
  }

  playAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.phoneOpacity, {
        toValue: 0,
        duration: 0
      }),
      Animated.timing(this.state.phoneOpacity, {
        toValue: 1,
        duration: 500
      })
    ]).start()
  }

  renderTitle = () => {
    return <View className="wow fadeInUp" style={{ width: '100%' }}>
      <Text style={styles.title}>{this.props.configs.title}</Text>
      <Text style={styles.subtitle}>{this.props.configs.subtitle}</Text>
    </View>
  }

  renderCarousel = () => {
    return <View style={styles.carouselContainer}>
      {this.renderPhone()}
      {this.renderStep()}
    </View>
  }

  renderStep = () => {
    return <View style={styles.stepContainer}>
      {this.props.configs.step.map(this.renderStepItem)}
    </View>
  }

  renderStepItem = (item, index) => {
    const activeStep = this.state.activeStep,
      indexStyle = index === activeStep ? { color: 'white' } : {},
      indexContainerStyle = index === activeStep ? { backgroundColor: colors.main } : {},
      titleStyle = index === activeStep ? { color: colors.darken(colors.main, 10) } : {},
      descriptionStyle = index === activeStep ? { color: colors.darken(colors.main, 20) } : {};
    return <TouchableOpacity
      onPress={() => this.setState({ activeStep: index })}
      style={styles.itemContainer}
      key={index}>
      <View style={[styles.indexContainer, indexContainerStyle]}>
        <Text style={[styles.indexText, indexStyle]}>{index + 1}</Text>
      </View>
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={[styles.itemTitle, titleStyle]}>{item.title}</Text>
        <Text style={[styles.itemDescription, descriptionStyle]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  }

  renderPhone = () => {
    return <View style={styles.phoneContainer}>
      <Animated.View
        className="wow fadeIn"
        style={[styles.phoneInner, { opacity: this.state.phoneOpacity }]}>
        <Text style={styles.phoneStep}>Step {this.state.activeStep + 1}</Text>
      </Animated.View>
      <View style={styles.phoneImage}/>
    </View>
  }

  render () {
    return <View style={styles.container}>
      <View style={styles.innerContainer}/>
      {this.renderTitle()}
      {this.renderCarousel()}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: "url('img/together.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center'
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
  },
  carouselContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  phoneContainer: {
    marginLeft: 50
  },
  phoneImage: {
    width: 200,
    height: 400,
    backgroundImage: "url('img/hand_phone.png')",
    backgroundSize: 'contain',
    backgroundPosition: '0 0',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInner: {
    position: 'absolute',
    top:20, left: 5,
    width: '90%',
    height: '90%',
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneStep: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Lato'
  },
  stepContainer: {
    marginLeft: 10
  },
  itemContainer: {
    height: 100,
    flexDirection: 'row',
    maxWidth: 600,
    alignItems: 'center'
  },
  indexContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.main,
    borderWidth: 1,
    borderRadius: 10
  },
  indexText: {
    fontSize: 12,
    fontFamily: 'Lato',
    color: colors.main
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Vollkorn'
  },
  itemDescription: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Vollkorn'
  }
});