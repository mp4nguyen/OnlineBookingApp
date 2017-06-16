

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Body, Left, Right } from 'native-base';
import R from 'ramda';
import styles from './styles';
import ProfileForm from '../profile-form';
import { signupOrCreateMemberOrUpdateMember ,validateProfile} from '../../actions/user';
import {showToast} from '../../actions/toast';

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
    const { navigation } = this.props;
    this.props.validateProfile().then(()=>{
      this.props.signupOrCreateMemberOrUpdateMember().then(() => {
        const { key } = R.last(R.reverse(navigation.routes));

        if (!!key && key === 'home') {
          popRoute(navigation.key);
        } else {
          this.props.reset(navigation.key);
        }
      }).catch(alert);
    },err=>{
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
    });
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
    validateProfile: () => dispatch(validateProfile()),
    showToast: prop => dispatch(showToast(prop)),
    signupOrCreateMemberOrUpdateMember: () => dispatch(signupOrCreateMemberOrUpdateMember()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  userId: R.pathOr(1, ['user', 'userId'], state.user),
  canUpdateBooking: !state.booking.booking.isFilledProfile,
});

export default connect(mapStateToProps, bindAction)(SignUpProfile);
