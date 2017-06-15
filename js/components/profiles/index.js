

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import R from 'ramda';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Header, Content, Text, Icon, Thumbnail, Button, Picker, Item ,Footer} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
import styles from './styles';

import {goToPage} from '../../actions/nextPage';
import { DEFAULT_PROFILE,selectProfile } from '../../actions/user';
const {
  pushRoute,
} = actions;

class Profiles extends Component {
  static defaultProps = {
    showDelete: true
  }

  static propTypes = {
    goToPage: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    profiles: React.PropTypes.array,
    selectProfile: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.selectProfile = this.selectProfile.bind(this);
  }

  componentDidMount() {

  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  selectProfile(profile){
    this.props.selectProfile(profile).then(()=>{
      this.props.goToPage(this.props.nextPage);
    });
  }


  render() {

    const items = this.props.profiles.map(x => (
      <View key={x.personId}>
        <TouchableOpacity onPress={ () => {this.selectProfile(x)}}>
          <View style={styles.listItem}>
            <Text numberOfLines={2} style={styles.listName}>
              {`${x.firstName} ${x.lastName}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));

    return (
      <Container theme={theme}>
        <HeaderContent/>
        <Content showsVerticalScrollIndicator={false} style={ styles.listContainer}>
          <View style={{ flex: 1 }} >
            {items}
          </View>
        </Content>
        <Footer style={styles.footer}>
            <Button full style={{ borderRadius: 0, margin: 0, borderWidth: 0, backgroundColor: '#00ADEE' }}>
              <Text style={{ fontSize: 14, color: '#fff' }}>Add Member</Text>
            </Button>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    selectProfile: profile => dispatch(selectProfile(profile)),
    goToPage: page => dispatch(goToPage(page)),
  };
}

const mapStateToProps = (state) => {
  const { user, defaultProfile } = state.user;
  return {
    navigation: state.cardNavigation,
    profiles: state.user.profiles,
    nextPage: state.pageControl.profiles.nextPage,
  };
};

export default connect(mapStateToProps, bindAction)(Profiles);
