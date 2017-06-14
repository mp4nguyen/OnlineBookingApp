import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';

import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';

import BookingFooter from './bookingFooter';
import AppointmentSection from './appointmentSection';
import styles from './styles';
import HeaderContent from '../headerContent';
import { updateBooking } from '../../actions/booking';

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
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const { hasHealthInsurance } = this.props.booking;
    return (
      <Container>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <AppointmentSection />
            <Text style={styles.title}>DO YOU HAVE PRIVATE HEALTH INSURANCE</Text>
            <View style={styles.about}>
              <TouchableOpacity style={styles.radioBtn} onPress={() => this.props.updateBooking({ hasHealthInsurance: true })}>
                <Text style={styles.buttonText}>Yes</Text>
                <Radio selected={hasHealthInsurance} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioBtn} onPress={() => this.props.updateBooking({ hasHealthInsurance: false })}>
                <Text style={styles.buttonText}>No</Text>
                <Radio selected={!hasHealthInsurance} />
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <BookingFooter step={0} continueFunc={() => this.pushRoute('confirmBooking')}/>
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
  booking: state.booking.booking,

});

export default connect(mapStateToProps, bindAction)(Booking);
