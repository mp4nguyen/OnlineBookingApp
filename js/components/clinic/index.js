import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Body, H3 } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Lightbox from 'react-native-lightbox';
import Modal from 'react-native-simple-modal';
import Swiper from 'react-native-swiper';
import moment from 'moment';

import theme from '../../themes/base-theme';
import styles from './styles';
import HeaderContent from '../headerContent';
import { selectSlot } from '../../actions/booking';
import {nextDate,prevDate} from '../../actions/searchClinic';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;


const {
  pushRoute,
} = actions;

class Clinic extends Component {

  static propTypes = {
    updateBooking: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.nextDate = this.nextDate.bind(this);
    this.prevDate = this.prevDate.bind(this);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  selectSlot(slot) {
    this.props.selectSlot({ slot })
      .then(this.pushRoute('booking'))
      .catch((e) => alert('error!'));
  }

  nextDate(){
    this.props.nextDate();
  }

  prevDate(){
    this.props.prevDate();
  }

  render() {
    var { slots, clinicName, clinicLogo } = this.props.clinic;
    slots = slots||[];
    console.log("rendering clinics ..... date = ",this.props.searchDate);
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <View style={styles.cover}>
              <Image source={require('../../../images/Rockingham-Pier-2.jpg')} style={styles.coverImage}>
                <View style={styles.clinicLogo}>
                  <View style={{ paddingBottom: 10 }}>
                    <Image source={{ uri: clinicLogo }} style={{ width: 90, height: 90 }} />
                  </View>
                  <Text style={styles.coverTitle}>{clinicName}</Text>
                </View>
              </Image>
            </View>
            <View>
              <View style={styles.navDate}>
                <TouchableOpacity activeOpacity={this.props.isBack ?  0.2 : 1} disabled={!this.props.isBack} onPress={this.prevDate} >
                  <Icon name="ios-arrow-back" style={this.props.isBack ? styles.textGrey : styles.disabledTextGrey} />                  
                </TouchableOpacity>
                <Text style={styles.textGrey}>{ this.props.searchDate.format('DD - MM - YYYY')}</Text>
                <TouchableOpacity onPress={this.nextDate} >
                  <Icon name="ios-arrow-forward" style={styles.textGrey} />
                </TouchableOpacity>
              </View>

              <View style={styles.slotsWrapper}>
                { slots.map((item, x) =>
                  <TouchableOpacity key={x} onPress={() => this.selectSlot(item)} style={styles.timeBtn}><Text style={styles.slotText} >{moment(item.fromTime).format('h:mm a')}</Text></TouchableOpacity>)
                }
              </View>
              <View style={{ padding: 20 }}>
                <Button primary block><Text style={styles.changeDate}>Change Date</Text></Button>
              </View>
              <H3 style={styles.sectionTitle}>ABOUT THIS PRACTICE</H3>
              <View style={styles.separate}>
                <Text style={styles.body}>All staff at the canter are committed to
                    provide culturally appropriate and quality health care to improve health outcomes of all members of our diverse community. The GP day clinic is a bulk billing
                    All staff at the canter are committed to
                    provide culturally appropriate and quality health care to improve health outcomes of all members of our diverse community. The GP day clinic is a bulk billing
                </Text>
              </View>
              <H3 style={styles.sectionTitle}>OPENING HOURS</H3>
              <View style={styles.separate}>
                <Text style={styles.body}>
                  Mon -Fri: 08:00am - 18:00pm
                                  : 07:00am - 18:00pm
                              Sat: 08:00am - 18:00pm
                              Sun: 09:00am - 18:00pm
                  Public Holidays: 09:00am - 18:00pm
                </Text>
              </View>
              <H3 style={styles.sectionTitle}>OPENING HOURS</H3>
              <View style={styles.separate}>
                <Text style={styles.body}>
                  After Hours Care
                </Text>
              </View>
              <H3 style={styles.sectionTitle}>STAFF</H3>

            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    selectSlot: slot => dispatch(selectSlot(slot)),
    nextDate: () => dispatch(nextDate()),
    prevDate: () => dispatch(prevDate()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  clinic: state.searchClinic.clinic || {},
  isBack: state.searchClinic.searchCriteria.isBack,
  searchDate: state.searchClinic.searchCriteria.searchDate
});

export default connect(mapStateToProps, bindAction)(Clinic);
