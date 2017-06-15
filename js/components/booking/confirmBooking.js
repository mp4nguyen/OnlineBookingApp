import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';
import moment from 'moment';

import BookingFooter from './bookingFooter';
import styles from './styles';
import HeaderContent from '../headerContent';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;

const {
  popRoute,
  pushRoute,
  reset,
} = actions;

class Booking extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    booking: React.PropTypes.object,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  submit() {
    this.props.reset(this.props.navigation.key);
  }
  render() {
    const   slot  = this.props.slot;
    const {clinic} = this.props;
    const { firstName, lastName, dob, email, address, mobile,ward,suburbDistrict,stateProvince,postcode } = this.props.profile;
    return (
      <Container>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.confirmBookingContentWrapper}>
            <Text style={styles.confirmText}>Confirm your appointment</Text>
            <View>
              <Grid>
                <Col style={styles.detailWrap}>
                  <Icon name="clock-o" size={30} color="#000"/>
                  <Text style={styles.detailTime}>{moment(slot.fromTime).format('h:mm a')}</Text>
                  <Text style={styles.detailPrimary}>{moment(slot.fromTime).format('dddd')}</Text>
                  <Text style={styles.detailSecondary}>{moment(slot.fromTime).format('MMM DD, YYYY')}</Text>
                </Col>
                <Col style={styles.detailWrap}>
                  <Icon name="user-md" size={30} color="#000"/>
                  <Text style={styles.detailTime}>{'Dr. ' + slot.firstName + ' ' + slot.lastName}</Text>
                  <Text style={styles.detailPrimary}>{clinic.clinicName}</Text>
                  <Text style={styles.detailSecondary}>{clinic.address}</Text>
                  <Text style={styles.detailSecondary}>{clinic.ward + ' ' + clinic.suburbDistrict + ' ' + clinic.stateProvice}</Text>
                </Col>
              </Grid>
            </View>
            <Text style={styles.confirmText}>For</Text>
              <View>
                <Grid>
                  <Col style={styles.detailWrap}>
                    <Icon name="user-o" size={30} color="#000"/>
                    <Text style={styles.detailTime}>{firstName} {lastName}</Text>
                  </Col>
                </Grid>
              </View>
            <Text style={styles.term}>
              By continuing with your booking, you agree to our Terms of Use, Privacy Policy, and Collection Notice.
            </Text>
            <Button style={styles.complete} onPress={this.submit}><Text style={{ fontWeight: 'bold', fontSize: 14, color: '#fff' }}>Complete Booking</Text></Button>
          </View>
          <Button block style={{ borderRadius: 0, margin: 0, borderWidth: 0, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#000' }}>Frequently Asked Questions</Text>
            <Icon name="angle-right" style={{ fontSize: 25, color: '#000' }} />
          </Button>
        </Content>
        <BookingFooter step={3}/>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'home' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  slot: state.booking.slot,
  clinic: state.searchClinic.clinic,
  profile: state.user.profile
});

export default connect(mapStateToProps, bindAction)(Booking);
