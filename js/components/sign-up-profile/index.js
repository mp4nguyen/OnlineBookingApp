

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Body, Left, Right } from 'native-base';
import R from 'ramda';
import styles from './styles';
import ProfileForm from '../profile-form';
import { createProfile } from '../../actions/user';
import { updateBooking } from '../../actions/booking';
const {
  reset,
  popRoute,
} = actions;

class SignUpProfile extends Component {


  static propTypes = {
    canUpdateBooking: React.PropTypes.bool,
    updateBooking: React.PropTypes.func,
    userId: React.PropTypes.number,
    reset: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    saveProfile: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const { saveProfile, popRoute, navigation, userId, canUpdateBooking } = this.props;
    const profile = { ...this.state, userId };
    !!saveProfile && saveProfile(profile).then(() => {
      const { key } = R.last(R.reverse(navigation.routes));
      !!canUpdateBooking && this.props.updateBooking({ profile });
      if (!!key && key === 'home') {
        popRoute(navigation.key);
      } else {
        this.props.reset(navigation.key);
      }
    }).catch(alert);
  }

  render() {
    return (
      <Container>
        <Image source={require('../../../images/BG-signUp.jpg')} style={styles.background} >
          <Header style={styles.header}>
            <Body>
              <Text style={styles.signupHeader}>
                                    CREATE ACCOUNT
                                </Text>
            </Body>
          </Header>
          <Content>
            <ProfileForm onChange={value => this.setState(value)} />
          </Content>
          <View style={styles.footer}>
            <Button
              bordered block
              onPress={this.signUp}
              style={styles.signupBtn}
            >
              <Text style={{ color: '#FFF' }}>Register</Text>
            </Button>
          </View>
        </Image>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    reset: key => dispatch(reset([{ key: 'home' }], key, 0)),
    popRoute: key => dispatch(popRoute(key)),
    saveProfile: profile => dispatch(createProfile(profile)),
    updateBooking: profile => dispatch(updateBooking(profile)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  userId: R.pathOr(1, ['user', 'userId'], state.user),
  canUpdateBooking: !state.booking.booking.isFilledProfile,
});

export default connect(mapStateToProps, bindAction)(SignUpProfile);
