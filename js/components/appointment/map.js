

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';

import styles from './styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class MapDetail extends Component {

  static propTypes = {

  }

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          style={styles.maps}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}
export default MapDetail;
