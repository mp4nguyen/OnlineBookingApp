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

import { goToPage } from '../../actions/nextPage';

//import R from 'ramda';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;


class PracticeInformation extends Component {

  static propTypes = {
    goToPage: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    user: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit() {
    if (this.props.user) {
      this.props.goToPatientProfile();
    } else {
      this.props.goToAnomyousProfile();
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

        </Content>
        <BookingFooter step={1} continueFunc={this.submit}/>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    goToPatientProfile: item => dispatch(goToPage('patientProfile')),
    goToAnomyousProfile: item => dispatch(goToPage('anonymousProfile')),

  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  user: state.user.user
});

export default connect(mapStateToProps, bindAction)(PracticeInformation);
