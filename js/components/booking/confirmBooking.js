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
    const { clinic, slot } = this.props.booking;
    const { clinicName } = clinic;
    const { apptTime, doctorName } = slot;
    return (
      <Container>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <Text style={styles.confirmText}>Confirm your appointment</Text>
            <View>
            <Grid>
              <Col style={styles.detailWrap}>
                <Icon name="ios-person-outline" />
                <Text style={styles.detailTime}>{moment(apptTime).format('h:mm a')}</Text>
                <Text style={styles.detailPrimary}>{moment(apptTime).format('dddd')}</Text>
                <Text style={styles.detailSecondary}>{moment(apptTime).format('MMM DD, YYYY')}</Text>
              </Col>
              <Col style={styles.detailWrap}>
                <Icon name="ios-person-outline" />
                <Text style={styles.detailPrimary}>{clinicName}</Text>
                <Text style={styles.detailSecondary}>{doctorName}</Text>
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
            <Icon name="ios-arrow-forward" style={{ fontSize: 13, color: '#000' }} />
          </Button>
        </Content>
        <Footer style={styles.footer}>
          <View style={styles.footerPanel}>
            <Text style={styles.text}>Confirm Booking</Text>
            <View style={styles.wrap}>
              <View style={[styles.cycle, styles.cycleFull]} />
              <View style={styles.line} />
              <View style={[styles.cycle, styles.cycleFull]} />
              <View style={styles.line} />
              <View style={[styles.cycle, styles.cycleFull]} />
              <View style={styles.line} />
              <View style={[styles.cycle, styles.cycleFull]} />
              <View style={styles.line} />
              <View style={[styles.cycle, styles.cycleFull]} />
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
    reset: key => dispatch(reset([{ key: 'home' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  booking: state.booking.booking,
});

export default connect(mapStateToProps, bindAction)(Booking);
