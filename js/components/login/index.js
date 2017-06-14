
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right,Body } from 'native-base';
import R from 'ramda';
import styles from './styles';
import navigateTo from '../../actions/sideBarNav';
import { login } from '../../actions/user';
const {
  replaceAtIndex,
  pushRoute,
  reset,
  popRoute,
} = actions;

const bg = require('../../../images/BG.jpg');
const logo = require('../../../images/logo_Asset 1.png');

class Login extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    replaceAtIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      username: 'phuong_thql',
      password: '1234',
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.login = this.login.bind(this);
    this.popRoute = this.popRoute.bind(this);
  }

  replaceRoute(route) {
    const navigation = this.props.navigation;
    this.props.replaceAtIndex(navigation.index, { key: route }, navigation.key);
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  login() {
    const { login, popRoute, navigation } = this.props;
    login && login(this.state).then(() => {
      const { key } = R.last(R.reverse(navigation.routes));
      if (!!key && key === 'home') {
        popRoute(navigation.key);
      } else {
        this.replaceRoute('home');
      }
    }).catch(alert);
  }

  render() {
    return (
      <Container>
        <Image source={bg} style={styles.background} >

          <View style={styles.logo} >
            <Image source={logo} style={styles.iosShadow} />
          </View>
          <Content style={styles.wrapBg}>
            <View style={styles.bg}>
              <Item rounded style={styles.inputGrp}>
                <Icon name="person" />
                <Input
                  value = {this.state.username}
                  placeholder="Username"
                  onChangeText={username => this.setState({ username })}
                  placeholderTextColor="#FFF"
                  style={styles.input}
                />
              </Item>

              <Item rounded style={styles.inputGrp}>
                <Icon name="unlock" />
                <Input
                  value = {this.state.password}
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor="#FFF"
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </Item>

              <Button
                rounded primary block large
                style={styles.loginBtn}
                onPress={this.login}
              >
                <Text style={Platform.OS === 'android' ? { fontSize: 16, textAlign: 'center', top: -5 } : { fontSize: 16, fontWeight: '900' }}>Get Started</Text>
              </Button>

              <View style={styles.otherLinksContainer}>
                <Left>
                  <Button transparent style={{ alignSelf: 'flex-start' }} onPress={() => this.pushRoute('signUp')}>
                    <Text style={styles.helpBtns}>
                      Signup
                      </Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent style={{ alignSelf: 'center' }} onPress={this.popRoute}>
                    <Text style={styles.helpBtns}>
                      Cancel
                      </Text>
                  </Button>
                </Body>
                <Right>
                  <Button transparent style={{ alignSelf: 'flex-end' }} onPress={() => this.pushRoute('needhelp')}>
                    <Text style={styles.helpBtns}>
                      Need Help?
                      </Text>
                  </Button>
                </Right>
              </View>
            </View>
          </Content>

        </Image>
      </Container>
    );
  }
}


function bindActions(dispatch) {
  return {
    replaceAtIndex: (index, route, key) => dispatch(replaceAtIndex(index, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    login: user => dispatch(login(user)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
