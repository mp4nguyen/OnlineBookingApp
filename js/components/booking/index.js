import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';
import moment from 'moment';

import styles from './styles';
import HeaderContent from '../headerContent';
import { updateBooking } from '../../actions/booking';
import AppointmentSection from './appointmentSection';
import BookingFooter from './bookingFooter';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;

const {
  popRoute,
  pushRoute,
} = actions;

class Booking extends Component {

  static propTypes = {
    updateBooking: React.PropTypes.func,
    booking: React.PropTypes.object,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      reasonForApt: '',
    };
    this.booking = this.booking.bind(this);
    this.pushRoute = this.pushRoute.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  booking() {
    this.props.updateBooking({ reasonForApt: this.state.reasonForApt })
      .then(this.pushRoute('practiceInformation'))
      .catch(e => alert('error!'));
  }

  render() {
    var aboutThisPracice = false;
    var aptType = 'isGeneralAppointment';
    return (
      <Container>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <AppointmentSection />
            <Text style={styles.title}>ATTENDED THIS PRACTICE</Text>
            <View style={styles.about}>
              <TouchableOpacity
                style={styles.radioBtn}
                onPress={() => this.props.updateBooking({ aboutThisPracice: true })}
              >
                <Text style={styles.buttonText}>Yes</Text>
                <Radio selected={aboutThisPracice} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioBtn}
                onPress={() => this.props.updateBooking({ aboutThisPracice: false })}
              >
                <Text style={styles.buttonText}>No</Text>
                <Radio selected={!aboutThisPracice} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>APPOINTMENT</Text>
            <View style={styles.about}>
              <View style={styles.radioBtn}>
                <Text style={styles.greyText}>Type</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Picker
                    supportedOrientations={['portrait', 'landscape']}
                    iosHeader="Select appointment type"
                    mode="dropdown"
                    selectedValue={aptType}
                    style={styles.picker}
                    textStyle={styles.pickerText}
                    onValueChange={value => this.props.updateBooking({ aptType: value })}
                  >
                    <Item label="General Appointment" value="isGeneralAppointment" />
                    <Item label="Illness" value="isIllness" />
                    <Item label="Car Accident" value="isCarAccident" />
                    <Item label="Medical Certificate" value="isMedicalCertificate" />
                    <Item label="Non Workplace Injury" value="isNonWorkplaceInjury" />
                    <Item label="Workplace Injury" value="isWorkplaceInjury" />
                    <Item label="Prescription" value="isPrescription" />
                    <Item label="Unsure/Other" value="isUnsureOrOther" />
                  </Picker>
                  <Icon name="ios-arrow-forward" style={{ width: 10, color: '#989898', fontSize: 20, marginLeft: 10, lineHeight: 24 }} />
                </View>
              </View>

              <Input
                value={this.state.reasonForApt}
                onChange={e => this.setState({ reasonForApt: e.nativeEvent.text })}
                placeholder="Reason for appointment (optional)" style={styles.input}
                placeholderTextColor="#CCCBCB"
              />
            </View>
            <Text style={{ textAlign: 'center', padding: 30, fontSize: 13, color: 'red' }}> Is this an emergency ?</Text>
          </View>
        </Content>
        <BookingFooter step={0} continueFunc={this.booking}/>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    updateBooking: item => dispatch(updateBooking(item)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  slot: state.booking.slot,
});

export default connect(mapStateToProps, bindAction)(Booking);
