
import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Icon, Button, Left, Right, Body, Header } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  reset,
  pushRoute,
} = actions;
const headerLogo = require('../../../images/LogoRedid.png');

class HeaderContent extends Component {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    children: React.PropTypes.element,
    customStyle: React.PropTypes.any,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      index: React.PropTypes.number,
    }),
    authenticated: React.PropTypes.bool,
    rightButton: React.PropTypes.element,
    onPop: React.PropTypes.func,
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  render() {
    if (!this.props.authenticated) {
      const child = this.props.children || (<Image source={headerLogo} style={styles.imageHeader} />);
      return (
        <Header style={{height:50}}>
          <Left>
            {this.props.navigation.index > 0 &&
            <Button transparent onPress={() => this.popRoute()}>
              <Icon active name="arrow-back" />
            </Button>}
          </Left>
          <Body>
            {child}
          </Body>
          <Right>
            <TouchableOpacity style={styles.btnHeader} transparent onPress={() => this.pushRoute('login')} >
              <Text style={styles.signinText}>Signin/Join</Text>
            </TouchableOpacity>
          </Right>
        </Header>
      );
    }
    return (
      <Header style={{ ...(this.props.customStyle || {}) }}>
        <Left>
          {this.props.navigation.index > 0 &&
          <Button
            transparent onPress={() => {
              this.popRoute();
              this.props.onPop && this.props.onPop();
            }}
          >
            <Icon active name="arrow-back" />
          </Button>}
          {this.props.navigation.index === 0 &&
            <Button
              transparent
              onPress={() => this.props.reset(this.props.navigation.key)}
            >
              <Icon active name="power" />
            </Button>}
        </Left>
        <Body>
          {this.props.children ? this.props.children :
          <Image source={headerLogo} style={styles.imageHeader} /> }
        </Body>
        <Right>
          {this.props.rightButton ? this.props.rightButton : <Button transparent onPress={this.props.openDrawer} >
            <Icon active name="menu" />
          </Button>
          }
        </Right>
      </Header>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  authenticated: !!state.user.user,
});

export default connect(mapStateToProps, bindAction)(HeaderContent);
