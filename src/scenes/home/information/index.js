import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import MaterialIcons from '../../../components/vector-icons/MaterialIcons';

type Props = {
  homeConfigs ?: Object
}

export default class InformationPanel extends Component {
  props: Props;

  renderRating = (item) => {
    const starArray = new Array(5).fill('star');
    return <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>Rating</Text>
      <View style={styles.starContainer}>
        {starArray.map((star, index) =>
          <MaterialIcons
            style={[styles.starIcon, { marginRight: index === 0 ? 0 : 5 }]}
            key={index} name="star"
            color={((index + 1) > item.rating) ? 'white' : 'yellow'}
          />)}
      </View>

    </View>
  }

  renderEachItem = (item, index) => {
    const overrideStyles = {
      zIndex: (item.isSide === true) ? 1 : 2,
      borderBottomColor: item.mainColor
    }, subTitleStyle = {
      marginTop: 25
    }, titleStyle = {
      marginTop: 5,
      color: item.mainColor
    }
    return <View className="wow fadeInUp" style={[styles.itemContainer, overrideStyles]} key={index}>
      <View style={[styles.image, { backgroundImage: item.image, height: item.isSide ? 240 : 340 }]}/>
      <Text style={[styles.subTitle, subTitleStyle]}>{item.subTitle}</Text>
      <Text style={[styles.title, titleStyle]}>{item.title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      {this.renderRating(item)}
    </View>
  }

  render () {
    return <View style={styles.container}>
      {this.props.homeConfigs.travelSection.map(this.renderEachItem)}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 400,
    width: '65%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  itemContainer: {
    width: 275,
    backgroundColor: '#FEFDF9',
    borderBottomWidth: 5,
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 5 },
    shadowRadius: 10,
  },
  image: {
    marginTop: 5,
    width: '100%',
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Vollkorn'
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    fontFamily: 'Lato'
  },
  descriptionContainer: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  description: {
    fontSize: 13,
    fontFamily: 'Old Standard TT',
    textAlign: 'center'
  },
  ratingContainer: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  ratingText: {
    fontSize: 15,
    fontFamily: 'Vollkorn'
  },
  starIcon: {
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5
  },
  starContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});