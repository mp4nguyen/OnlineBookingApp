
import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Icon, List, ListItem, Thumbnail } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import { closeDrawer } from '../../actions/drawer';

import { logOut } from '../../actions/user';


import navigateTo from '../../actions/sideBarNav';
import styles from './style';


const {
  reset,
} = actions;

class SideBar extends Component {

  static propTypes = {
    signOut: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }
  reset() {
    this.props.reset(this.props.navigation.key);
  }
  signOut() {
    this.props.signOut().then(this.props.closeDrawer);
  }
  render() {
    return (
      <Container>
        <Image source={require('../../../images/sid.png')} style={styles.background} >
          <Content style={styles.drawerContent}>
            <View style={styles.viewWelCome}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.username}> {`${this.props.account.firstName} ${this.props.account.lastName}`}</Text>
            </View>
            <ListItem button onPress={() => this.navigateTo('home')} iconLeft style={styles.links} >
              <Icon name="ios-home-outline" />
              <Text style={styles.linkText}> HOME</Text>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('profile')} iconLeft style={styles.links} >
              <Icon name="ios-person-outline" />
              <Text style={styles.linkText} >MY PROFILE</Text>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('myBooking')} iconLeft style={styles.links} >
              <Icon name="ios-keypad-outline" />
              <Text style={styles.linkText}>MY BOOKINGS</Text>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('overview')} iconLeft style={styles.links} >
              <Icon name="ios-stats" />
              <Text style={styles.linkText}>MY ORGANIZATION</Text>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('settings')} iconLeft style={styles.links}>
              <Icon name="ios-settings-outline" />
              <Text style={styles.linkText}>SETTING</Text>
            </ListItem>
            <ListItem button onPress={() => this.navigateTo('invoices')} iconLeft style={styles.links} >
              <Icon name="ios-timer-outline" />
              <Text style={styles.linkText}>INVOICES</Text>
            </ListItem>
            <ListItem button onPress={this.signOut} iconLeft style={styles.links} >
              <Icon name="ios-power-outline" />
              <Text style={styles.linkText}>LOGOUT</Text>
            </ListItem>
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(closeDrawer(), reset([{ key: 'login' }], key, 0)),
    closeDrawer: () => dispatch(closeDrawer()),
    signOut: () => dispatch(logOut()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  account: state.user.defaultProfile
});

export default connect(mapStateToProps, bindAction)(SideBar);
