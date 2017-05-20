
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right } from 'native-base';
import HeaderContent from '../headerContent';
import styles from './styles';
import { Grid, Col } from 'react-native-easy-grid';
import Form from './form';
import MapView from './map';
import moment from 'moment';
const {
  replaceAtIndex,
  pushRoute,
} = actions;

const bg = require('../../../images/BG-signUp.jpg');

class Appointment extends Component {

  static propTypes = {
    replaceAtIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    detail: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;
    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const { apptTime, clinicName, address, doctorName, phone } = this.props.detail;
    return (
      <Container >
        <Image source={bg} style={styles.background} >
          <HeaderContent style={styles.header} />
          <View style={styles.contents}>
            <Content >
              <View style={styles.bg}>
                <Text style={styles.time}>{moment(apptTime).format('hh:mm A')}</Text>
                <Text style={styles.date}>{moment(apptTime).format('ddd, MMM D, YYYY')}</Text>
                <Text style={styles.clinic}>{clinicName}</Text>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.phone}>{phone}</Text>
                <View style={{ marginBottom: 10 }}>
                  <Grid>
                    <Col><Text style={styles.name}>Jack Nguyen <Text style={styles.alias}>PATIENT</Text></Text></Col>
                    <Col style={{ alignItems: 'flex-end' }}><Text style={styles.name}>{doctorName} <Text style={styles.alias}>DOCTOR</Text></Text></Col>
                  </Grid>
                </View>
              </View>
              {moment(apptTime).isBefore(moment()) && <Form detail={this.props.detail} />}
            </Content>
          </View>
          {moment(apptTime).isAfter(moment()) && <MapView />}
        </Image>
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  detail: state.booking.appt,
});

export default connect(mapStateToProps, bindActions)(Appointment);
