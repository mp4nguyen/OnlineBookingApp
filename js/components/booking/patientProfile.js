import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import moment from 'moment';
import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';

import BookingFooter from './bookingFooter';
import AppointmentSection from './appointmentSection';
import styles from './styles';
import HeaderContent from '../headerContent';
import { setNewProfile } from '../../actions/booking';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;

const {
  popRoute,
  pushRoute,
} = actions;

class Booking extends Component {

  static propTypes = {
    setNewProfile: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.addNewProfile = this.addNewProfile.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  addNewProfile() {
    this.props.setNewProfile().then(() => this.pushRoute('bookingProfile'));
  }

  render() {
    const { profile } = this.props.booking;
    const { firstName, lastName, dob, email, address, mobile } = profile;
    return (
      <Container>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <AppointmentSection />
            <Text style={styles.title}>BOOK THIS APPOINTMENT FOR</Text>
            <View style={styles.about}>
              <Text style={styles.patientName}>{firstName} {lastName}</Text>
              <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.buttonText}>{email}</Text>
                <Radio selected />
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 15 }}>{mobile}</Text>
                  <Text style={{ fontSize: 15 }}>DBO: {!!dob && moment(dob).format('DD/MM/YY')}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.address} >{address}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.radioBtnPrimary} onPress={this.addNewProfile}>
                <Text style={styles.buttonTextPrimary}>Create New Profile</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.radioBtnPrimary} onPress={() => this.pushRoute('profiles')}>
              <Text style={styles.buttonTextPrimary}>Edit Selected Patient Information</Text>
            </TouchableOpacity>
          </View>
        </Content>
        <BookingFooter step={2} continueFunc={() => this.pushRoute('confirmBooking')}/>
      </Container>
    );
  }
}

/*
<TouchableOpacity style={styles.radioBtnPrimary} onPress={() => this.pushRoute('bookingProfile')}>
  <Text style={styles.buttonTextPrimary}>Edit Selected Patient Information</Text>
</TouchableOpacity>
*/
function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setNewProfile: () => dispatch(setNewProfile(true)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  booking: state.booking.booking,
});

export default connect(mapStateToProps, bindAction)(Booking);
