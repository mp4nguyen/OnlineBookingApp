
import React, { Component } from 'react';
import {  Image, View, TouchableOpacity, Platform, Slider, Dimensions,Animated } from 'react-native';
import { Content, Text, Button, Body, } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Toast extends Component {

  static propTypes = {
    type: React.PropTypes.string,
    message: React.PropTypes.string,
    showStatusCallBack: React.PropTypes.func,
    isShow: React.PropTypes.bool,
    height: React.PropTypes.number,
  }

  constructor(props) {
    super(props);

   this.animatedValue = new Animated.Value(0);

   this.animatedXValue = new Animated.Value(-deviceWidth);

  }

  componentDidMount(){

    if(this.props.isShow){
      console.log("=====> show toast");
      Animated.timing(
        this.animatedXValue,
        {
          toValue: 0,
          duration: 350
        }).start(this.closeXToast())
    }
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.isShow){
      console.log("=====> show toast");
      Animated.timing(
        this.animatedXValue,
        {
          toValue: 0,
          duration: 350
        }).start(this.closeXToast())
    }
  }

  callToast(message, type) {

    console.log("dddd" ,message, type);

    if(this.state.modalShown) return

    this.setToastType(message, type)
    this.setState({ modalShown: true })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }

  closeToast() {
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 350
      }).start()
    }, 2000)
  }

  callXToast() {
    Animated.timing(
      this.animatedXValue,
      {
        toValue: 0,
        duration: 350
      }).start(this.closeXToast())
  }

  closeXToast() {
    setTimeout(() => {

      this.props.showStatusCallBack();

      Animated.timing(this.animatedXValue,
      {
        toValue: - deviceWidth,
        duration: 350
      }).start();

    }, 2000)
  }

  setToastColor() {
    let color = 'green';
    if (this.props.type == 'error') color = '#E53935'
    if (this.props.type == 'primary') color = '#2487DB'
    if (this.props.type == 'warning') color = '#FFD600'
    if (this.props.type == 'success') color = '#00BFA5'
    return color;
  }
  //////////////////////

/*
<Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.toastColor, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
  <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
    { this.state.message }
  </Text>
</Animated.View>
*/
  render() {
    let animation = this.animatedValue.interpolate({
        inputRange: [0, .3, 1],
        outputRange: [-70, -10, 0]
      })

    if(this.props.isShow){
      return (
          <Animated.View style={{ transform: [{ translateX: this.animatedXValue }], height: (this.props.height||0), marginTop: deviceHeight - (this.props.height||0), backgroundColor: this.setToastColor(), position: 'absolute', left:0, top:0, right:0  }}>
          <Grid>
            <Col  style={{ width: (deviceWidth/4) }} >
              <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',alignItems: 'center' }} >
                <Icon name="exclamation-circle" size={40} color="#FFF"  />
              </View>
            </Col>
            <Col>
              <Text style={{  color: 'white', fontSize:12, fontWeight: 'bold', }}>{this.props.message}</Text>
            </Col>
          </Grid>

          </Animated.View>
      );
    } else{
      return null;
    }

  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    updateBooking: item => dispatch(updateBooking(item)),
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

export default Toast;
