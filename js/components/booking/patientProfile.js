import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


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
import { setProfilesProps } from '../../actions/pageControl';
import { goToPage } from '../../actions/nextPage';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;

const {
  popRoute,
  pushRoute,
} = actions;

class Booking extends Component {

  static propTypes = {
    setProfilesProps: React.PropTypes.func,
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
    this.goToProfiles = this.goToProfiles.bind(this);
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

  goToProfiles(){
    this.props.setProfilesProps();
    this.props.goToProfiles();
  }

  render() {

    const { firstName, lastName, dob, email, address, mobile,ward,suburbDistrict,stateProvince,postcode } = this.props.profile;
    return (
      <Container>
        <HeaderContent />
        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <AppointmentSection />
            <Text style={styles.title}>BOOK THIS APPOINTMENT FOR</Text>
            <View style={styles.about}>
              <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 5, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.patientName}>{firstName} {lastName}</Text>
                <TouchableOpacity style={styles.editButton} onPress={this.addNewProfile}>
                  <Icon name="facebook" style={styles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={styles.patientInfo}>{email}</Text>
                  <Text style={styles.patientInfo}>{mobile}</Text>
                  <Text style={styles.patientInfo}>DOB: {!!dob && moment(dob).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={styles.address} >{address}</Text>
                  <Text style={styles.address} >{ward} {suburbDistrict}</Text>
                  <Text style={styles.address} >{stateProvince} {postcode}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.radioBtnPrimary} onPress={this.addNewProfile}>
                <Text style={styles.buttonTextPrimary}>Create New Profile</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.radioBtnPrimary} onPress={this.goToProfiles}>
              <Text style={styles.buttonTextPrimary}>Select Patient</Text>
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
    setProfilesProps: () => dispatch(setProfilesProps({propName:'nextPage',propValue:'patientProfile'})),
    goToProfiles: () => dispatch(goToPage('profiles')),

  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  profile: state.user.profile
});

export default connect(mapStateToProps, bindAction)(Booking);
