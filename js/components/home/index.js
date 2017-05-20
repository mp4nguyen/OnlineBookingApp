
import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Card, Left, Body, Right } from 'native-base';

import { Grid, Col, Row } from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { openDrawer } from '../../actions/drawer';


import styles from './styles';
import Search from './Search';
import BookingType from './BookingType';
import HeaderContent from '../headerContent';

const {
  reset,
  pushRoute,
} = actions;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


class Home extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    reset: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    loadData: React.PropTypes.func,
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  componentDidMount() {
    this.props.loadData && this.props.loadData();
  }
  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <HeaderContent />

        <Content showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <Swiper
                height={(deviceHeight) / 2}
                width={deviceWidth + 3}
                loop
                dot={<View style={styles.swiperDot} />}
                activeDot={<View
                  style={styles.swiperActiveDot}
                  showsButtons
                />}
              >
                <Search searchSuccess={() => this.pushRoute('search')} />
              </Swiper>
            </View>
          </View>
          <BookingType />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Home);
