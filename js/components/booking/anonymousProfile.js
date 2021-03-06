
import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions,Animated } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import moment from 'moment';
import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';

import Toast from '../toast';
import BookingFooter from './bookingFooter';
import AppointmentSection from './appointmentSection';
import styles from './styles';
import HeaderContent from '../headerContent';
import { updateBooking } from '../../actions/booking';
import { goToPage,replaceRoute } from '../../actions/nextPage';
import {setLoginProps} from '../../actions/pageControl';
import {validateProfile} from '../../actions/user';

import R from 'ramda';
import ProfileForm from '../profile-form';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;
import navigateTo from '../../actions/sideBarNav';
import {showToast} from '../../actions/toast';

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

   this.animatedValue = new Animated.Value(0)
   this.animatedXValue = new Animated.Value(-deviceWidth)
   this.state = {
     modalShown: false,
     showModal: false,
     toastColor: 'green',
     message: ''
   }

    this.submit = this.submit.bind(this);
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

  submit(){
    this.props.validateProfile().then(()=>{this.props.goToConfirmation()},err=>{
      console.log(" err = ",err);
      var errString = "";
      for(var key in err) {
          var value = err[key];
          errString += key + ": ";
          value.forEach(e=>{
            errString += e + '; ';
          });
          errString += "\n"
      }
      console.log("errString = ",errString);
      this.props.showToast({type:'error',message:errString,height:100});
      //this.showToast(errString);
    });
    // if (this.props.user) {
    //   this.props.pushRoute({ key: 'patientProfile', index: 1 }, this.props.navigation.key);
    // } else {
    //   this.props.navigateTo('confirmBooking', 'practiceInformation');
    // }
  }

  showToast(message){
    this.setState({showModal:true,message});
  }

  showStatusCallBack(){
    this.setState({showModal:false});
  }

  render() {
    let animation = this.animatedValue.interpolate({
        inputRange: [0, .3, 1],
        outputRange: [-70, -10, 0]
      })

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
                <ProfileForm/>
              </View>
            </View>
          </Content>
          <BookingFooter step={2} continueFunc={this.submit}/>

      </Container>
    );
  }
}

//<Toast type="error" message={this.state.message} height={100} isShow={this.state.showModal} showStatusCallBack={this.showStatusCallBack.bind(this)} />

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    updateBooking: item => dispatch(updateBooking(item)),
    showToast: prop => dispatch(showToast(prop)),
    validateProfile: () => dispatch(validateProfile()),
    goToConfirmation: key => dispatch(goToPage('confirmBooking')),
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
