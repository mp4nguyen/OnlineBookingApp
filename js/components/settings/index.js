

import React, { Component } from 'react';
import { Image, View, Switch, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Container, Header, Content, Text, Button, Icon, Thumbnail, Item, Input, Left, Right, Body } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';

import styles from './styles';
import HeaderContent from '../headerContent';
const primary = require('../../themes/variable').brandPrimary;

const {
  reset,
} = actions;

class Settings extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      email: '',
      password: '',
    };
  }

  resetRoute(route) {
    this.props.resetRoute(route);
  }

  render() {
    return (
      <Container style={styles.bg}>
        <HeaderContent />
        <Content showsVerticalScrollIndicator={false}>
            <Text style={styles.signupHeader}>SETTINGS</Text>
            <View style={styles.signupContainer}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-person-outline" />
                <Input placeholder="Username" placeholderTextColor="rgba(255,255,255,0.5)" style={styles.input} />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-mail-open-outline" />
                <Input placeholder="Email" placeholderTextColor="rgba(255,255,255,0.5)" style={styles.input} />
              </Item>
              <Item rounded style={styles.inputGrp}>
                <Icon name="ios-unlock-outline" />
                <Input placeholder="Password" placeholderTextColor="rgba(255,255,255,0.5)"secureTextEntry style={styles.input} />
              </Item>
            </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Settings);
