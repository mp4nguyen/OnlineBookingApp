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
import AppointmentSection from './appointmentSection';
import styles from './styles';
import HeaderContent from '../headerContent';
import { updateBooking } from '../../actions/booking';
import R from 'ramda';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;
const {
  popRoute,
  pushRoute,
} = actions;

class PracticeInformation extends Component {

  static propTypes = {
    updateBooking: React.PropTypes.func,
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
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  submit() {
    const { navigation } = this.props;
    const pushRouteFn = this.props.pushRoute;
    if (this.props.user) {
      const profile = R.find(R.propEq('patientId', this.props.user.patientId), this.props.user.profiles);
      this.props.updateBooking({
        profile: profile || this.props.user.profiles[0],
      }).then(() => {
        pushRouteFn({ key: 'patientProfile', index: 1 }, navigation.key);
      });
    } else {
      pushRouteFn({ key: 'anonymousProfile', index: 1 }, navigation.key);
    }
  }

  render() {
    return (
      <Container>
        <HeaderContent />
        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <AppointmentSection />
            <Text style={styles.title}>PRACTICE POLICY</Text>
            <View style={styles.about}>
              <Text style={styles.aboutText}>
                Belmont City Medical Centre is a Bulk billing practice. All patients with a valid Medicare card will be bulk billed.
              </Text>
            </View>
          </View>
          <Button
            full
            onPress={() => this.submit('')}
            style={{ borderRadius: 0, margin: 0, borderWidth: 0, backgroundColor: '#00ADEE' }}
          >
            <Text style={{ fontSize: 14, color: '#fff' }}>Continue Booking</Text></Button>
        </Content>
        <Footer style={styles.footer}>
          <View style={styles.footerPanel}>
            <Text style={styles.text}>Practice Information</Text>
            <View style={styles.wrap}>
              <View style={[styles.cycle, styles.cycleFull]} />
              <View style={styles.line} />
              <View style={[styles.cycle, styles.cycleFull]} />
              <View style={styles.line} />
              <View style={styles.cycle} />
              <View style={styles.line} />
              <View style={styles.cycle} />
              <View style={styles.line} />
              <View style={styles.cycle} />
            </View>
          </View>
        </Footer>
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
  user: state.user.user,
});

export default connect(mapStateToProps, bindAction)(PracticeInformation);
