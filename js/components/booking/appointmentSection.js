import React, { Component } from 'react';
import { View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { Container, Header, Content, Text, Button, Icon, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';


import moment from 'moment';
import styles from './styles';

class AppointmentSection extends Component {

  static propTypes = {
    booking: React.PropTypes.object,
  }
  render() {
    const { clinic, slot } = this.props.booking;
    const { clinicName } = clinic;
    const { apptTime } = slot;
    return (
      <View style={styles.aptSection}>
        <View style={styles.timeInfo}>
          <Text style={styles.date}>{moment(apptTime).format('dddd, DD MMM')}</Text>
          <Text style={styles.time}>{moment(apptTime).format('h:mm a')}</Text>
        </View>
        <View>
          <Text style={styles.clinicText}>{clinicName}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  booking: state.booking.booking,
});

export default connect(mapStateToProps)(AppointmentSection);
