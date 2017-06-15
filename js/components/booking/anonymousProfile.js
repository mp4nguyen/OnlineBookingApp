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
import { updateBooking } from '../../actions/booking';
import { goToPage,replaceRoute } from '../../actions/nextPage';
import {setLoginProps} from '../../actions/pageControl';

import R from 'ramda';
import ProfileForm from '../profile-form';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;
import navigateTo from '../../actions/sideBarNav';
const {
  popRoute,
  pushRoute,
} = actions;

class AnonymousProfile extends Component {

  static propTypes = {
    goToPage: React.PropTypes.func,
    updateBooking: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    booking: React.PropTypes.object,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    user: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
  }

  componentWilMount(){
    console.log("AnonymousProfile.js.componentWilMount............");
  }

  componentDidMount(){
    console.log("AnonymousProfile.js.componentDidMount............");
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  submit() {
    if (this.props.user) {
      this.props.pushRoute({ key: 'patientProfile', index: 1 }, this.props.navigation.key);
    } else {
      this.props.navigateTo('confirmBooking', 'practiceInformation');
    }
  }
  changeProfile(value) {
    this.props.updateBooking({ isFilledProfile: true, profile: value });
  }
  render() {
    return (
      <Container>

          <HeaderContent />
          <AppointmentSection />
          <View style={styles.alertView}>
              <Button full onPress={this.props.goToLogin} style={{ borderRadius: 0, margin: 0, borderWidth: 0, backgroundColor: '#FFF' }}>
                <Text style={{ fontSize: 14, color: '#00f' }}>Login to save time</Text>
              </Button>
          </View>
          <Content showsVerticalScrollIndicator={false}>
            <View style={styles.contentWrapper}>
              <View>
                <ProfileForm profile={this.props.booking.profile} onChange={this.changeProfile} />
              </View>
            </View>
          </Content>
          <BookingFooter step={2} continueFunc={() => this.submit('')}/>

      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    updateBooking: item => dispatch(updateBooking(item)),
    goToLogin: () => {
      dispatch(setLoginProps({propName:'nextPage',propValue:'patientProfile'}))
      dispatch(replaceRoute('login'));
    },
    
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  booking: state.booking.booking,
  user: state.user.user,
});

export default connect(mapStateToProps, bindAction)(AnonymousProfile);
