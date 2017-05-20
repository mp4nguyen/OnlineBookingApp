import React, { Component } from 'react';
import { Image, View, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { Container, Content, Text, Icon, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { getBookings, setAppointment } from '../../actions/booking';
import HeaderContent from './../headerContent/';
import moment from 'moment';
import styles from './styles';
import ApptItem from './Item';
const bg2 = require('../../../images/BG_3.jpg');
const {
  pushRoute,
} = actions;

class MyBooking extends Component {
  static propTypes = {
    selectAppt: React.PropTypes.func,
    list: React.PropTypes.array,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    loadBookings: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.pushRoute = this.pushRoute.bind(this);
  }
  componentDidMount() {
    this.props.loadBookings();
  }
  pushRoute(apt) {
    this.props.selectAppt(apt).then(() => {
      this.props.pushRoute({ key: 'appointment', index: 1 }, this.props.navigation.key);
    });
  }
  render() {
    const previousApts = this.props.list.filter(x => moment(x.apptTime).isBefore(moment()));
    const upcommingApts = this.props.list.filter(x => moment(x.apptTime).isAfter(moment()));
    return (
      <Container style={styles.bg} >
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
          <HeaderContent />
          <View style={styles.overviewHeaderContainer}>
            <Image source={bg2} style={styles.imagebg}>
              <Text style={styles.overviewHeader}>MY BOOKINGS</Text>
            </Image>
          </View>
          <View style={styles.panelHeader}>
            <View style={styles.timelineHeaderView}>
              <View style={styles.timelineHeaderContent}>
                <Text />
              </View>
            </View>
            <Icon name="ios-bookmark" style={styles.iconHeader} />
            <View style={{ paddingLeft: 20, marginTop: 20 }}>
              <Text style={styles.timelineContentHeading}>UPCOMINGS APPOINTMENTS</Text>
            </View>
          </View>
          <Content showsVerticalScrollIndicator={false}>
            {!!upcommingApts && upcommingApts.map(appt => (
              <ApptItem key={appt.apptId} appt={appt} onPress={this.pushRoute} />
            ))}
          </Content>
          <View style={styles.panelHeader}>
            <View style={styles.timelineHeaderView}>
              <View style={styles.timelineHeaderContent}>
                <Text />
              </View>
            </View>
            <Icon name="ios-bookmark" style={styles.iconHeader} />
            <View style={{ paddingLeft: 20, marginTop: 20 }}>
              <Text style={styles.timelineContentHeading}>PREVIOUS APPOINTMENTS</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#fff', paddingRight: 20 }}>
            <Item style={styles.inputGrp}>
              <Input
                placeholder="Search"
                onChangeText={username => this.setState({ username })}
                placeholderTextColor="#FFF"
                style={styles.input}
              />
            </Item>
          </View>
          <Content showsVerticalScrollIndicator={false}>
            {!!previousApts && previousApts.map(appt => (
              <ApptItem key={appt.apptId} appt={appt} onPress={this.pushRoute} showAddress />
          ))}
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    loadBookings: () => dispatch(getBookings()),
    selectAppt: (item) => dispatch(setAppointment(item)),
  };
}
const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  list: state.booking.list,
});

export default connect(mapStateToProps, bindAction)(MyBooking);
