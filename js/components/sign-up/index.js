

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import navigateTo from '../../actions/sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View, Header, Body, Left, Right } from 'native-base';
import ProgressBar from './../loaders/ProgressBar';
import styles from './styles';
import { changeSignUpValue,checkAvailableAccount } from '../../actions/user';

const {
  reset,
  pushRoute,
  popRoute,
} = actions;

class SignUp extends Component {


  static propTypes = {
    createUser: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.state = {
      username: '',
      password: '',
      email: '',
      repassword: '',
    };
    this.changeValue = this.changeValue.bind(this);
    this.signUp = this.signUp.bind(this);
    this.popRoute = this.popRoute.bind(this);
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  resetRoute(route) {
    this.props.resetRoute(route);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  changeValue(input) {

    const that = this;
    return (target) => {
      this.props.changeSignUpValue({[input]: target.nativeEvent.text});
    };
  }
  signUp() {
    //this.navigateTo('signUpProfile');
    this.props.checkAvailableAccount().then(() => {
      this.navigateTo('signUpProfile');
    }).catch(alert);
  }
  render() {
    return (
      <Container>
        <Image source={require('../../../images/BG-signUp.jpg')} style={styles.background} >
          <Header style={styles.header}>
            <Body>
              <Text style={styles.signupHeader}>CREATE ACCOUNT</Text>
            </Body>
          </Header>

          <Content>
            <View style={styles.signupContainer}>
              <View style={styles.formContainer}>
                <Item style={styles.inputGrp}>
                  <Icon name="mail-open" />
                  <Input
                    value={this.props.email}
                    onChange={this.changeValue('email')}
                    placeholder="Email" style={styles.input}
                    placeholderTextColor="#FFF"
                  />
                </Item>
                <ProgressBar style={styles.progress} color="#fff" progress={30} />
                <Item style={styles.inputGrp}>
                  <Icon name="unlock" />
                  <Input
                    value={this.props.password}
                    onChange={this.changeValue('password')}
                    placeholder="Password" secureTextEntry style={styles.input}
                    placeholderTextColor="#FFF"
                  />
                </Item>
                <ProgressBar style={styles.progress} color="#fff" progress={30} />
              </View>
            </View>
          </Content>
          <View style={styles.footer}>
            <View style={styles.buttonsContainer}>
              <Left style={{ marginRight: 5 }}>
                <Button bordered block onPress={this.popRoute} style={styles.signupBtn}>
                  <Text style={{ color: '#FFF' }}>Cancel</Text>
                </Button>
              </Left>
              <Right style={{ marginLeft: 5 }}>
                <Button bordered block onPress={this.signUp} style={styles.signupBtn}>
                  <Text style={{ color: '#FFF' }}>Continue</Text>
                </Button>
              </Right>
            </View>


            <Button block transparent style={styles.termsButton}>
              <Text style={styles.termsText}>Terms & Conditions</Text>
            </Button>

          </View>

        </Image>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    changeSignUpValue: value => dispatch(changeSignUpValue(value)),
    checkAvailableAccount: () => dispatch(checkAvailableAccount()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  signup: state.user.signup
});

export default connect(mapStateToProps, bindAction)(SignUp);
