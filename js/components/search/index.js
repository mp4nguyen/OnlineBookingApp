
import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Content, Text, Button, Icon, Card, Left, Body, Right, List, ListItem } from 'native-base';

import { Grid, Col, Row } from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { openDrawer } from '../../actions/drawer';
import moment from 'moment';

import styles from './styles';
import HeaderContent from '../headerContent';
import BookingType from './BookingType';


import { searchClinics, selectClinic } from '../../actions/searchClinic';

const {
  reset,
  pushRoute,
} = actions;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


class SearchResult extends Component {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    list: React.PropTypes.array,
    selectClinic: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.selectClinic = this.selectClinic.bind(this);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  componentDidMount() {

  }

  search() {
    this.props.search({ clinic: '' });
  }

  selectClinic(clinic) {
    this.props.selectClinic({ clinic })
      .then(this.pushRoute('clinic'))
      .catch(x => alert(x));
  }

  renderClinic(item){

      return (
        <ListItem style={styles.listItem} onPress={() => this.selectClinic(item)}>
          <Grid>
            <Col size={1}>
              <View style={styles.clinicIconContaier}>
                <Image source={{ uri: item.iconBase64 }} style={styles.clinicIcon}  />
              </View>
            </Col>
            <Col size={4}>
              <Grid>
                <Col size={4} style={styles.textItem}>
                    <Text style={styles.name}>{item.clinicName}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                    <Text style={styles.slotApt}>{item.slots && item.slots.length > 0 && item.slots[0] && moment(item.slots[0].fromTime).format('h:mm a')}
                      {item.slots && item.slots.length - 1 > 0 && <Text style={styles.moreSlots}> +{item.slots.length - 1} more</Text>}
                    </Text>
                  </Col>
                <Col size={2} style={{ justifyContent: 'center' }}>
                    <Text style={styles.distance}>{item.distance} km        <Icon name="ios-arrow-forward" style={styles.icon} /></Text>
                  </Col>
              </Grid>
            </Col>
          </Grid>
        </ListItem>
      );
  }

  render() {
    return (
      <Container>
        <HeaderContent />
        <View style={styles.searchBar}>
          <Grid>
            <Col style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }} size={1}>
              <View>
                <TouchableOpacity onPress={this.search}><Icon name="ios-search" style={{ fontSize: 23, paddingRight: 5, paddingLeft: 10 }} /></TouchableOpacity>
              </View>
              <View>
                <View style={{ marginLeft: 10, marginRight: 10, borderRightWidth: 1, borderRightColor: '#fff', height: 20 }} />
              </View>
            </Col>
            <Col size={5}>
              <BookingType />
            </Col>
          </Grid>
        </View>
        <View style={styles.anotherBar}>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Icon style={styles.anotherIcon} name="ios-search" />
            <Text style={styles.anotherText}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Icon style={styles.anotherIcon} name="ios-search" />
            <Text style={styles.anotherText}>My Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Icon style={styles.anotherIcon} name="ios-search" />
            <Text style={styles.anotherText}>Map</Text>
          </TouchableOpacity>
        </View>
        <Content showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }} >
          <List
            dataArray={this.props.list}
            renderRow={item => this.renderClinic(item)}
          />
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
    search: clinic => dispatch(searchClinics(clinic)),
    selectClinic: clinic => dispatch(selectClinic(clinic)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  list: state.searchClinic.clinics,
});

export default connect(mapStateToProps, bindAction)(SearchResult);


//             <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <TouchableOpacity><Text>Search</Text></TouchableOpacity>
//             </Col>
//             <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <TouchableOpacity><Text>Search</Text></TouchableOpacity>
//             </Col>
//             <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
//               <TouchableOpacity><Text>Search</Text></TouchableOpacity>
//             </Col>
