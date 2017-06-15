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
    const { slot } = this.props.booking;
    const { clinicName } = this.props.clinic;
    const { fromTime,firstName,lastName } = slot;
    var doctorName = "Dr. " + firstName + " " + lastName;

    return (
      <View style={styles.aptSection}>
        <View style={styles.timeInfo}>
          <Text style={styles.date}>{moment(fromTime).format('dddd, DD MMM')}</Text>
          <Text style={styles.time}>{moment(fromTime).format('h:mm a')}</Text>
        </View>
        <View>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.clinicText}>{clinicName}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  booking: state.booking.booking,
  clinic: state.searchClinic.clinic
});

export default connect(mapStateToProps)(AppointmentSection);
