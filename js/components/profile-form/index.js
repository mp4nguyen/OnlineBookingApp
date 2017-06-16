

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, TouchableOpacity, Switch } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';

import styles from './styles';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import { changeProfileValue,DEFAULT_PROFILE as defaultProfile } from '../../actions/user';

class ProfileForm extends Component {

  static propTypes = {
    profile: React.PropTypes.object,
    changeProfileValue: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(field, value) {
    this.props.changeProfileValue({[field]: value} );
  }

  //
  // address
  //
  // country
  //
  // dob
  //
  // email
  //
  // firstName
  //
  // gender
  //
  // lastName
  //
  // mobile
  //
  // postcode
  //
  // stateProvince
  //
  // suburbDistrict
  //
  // ward

  render() {
    return (


      <View style={styles.contentWrapper}>
        <Text style={styles.title}>PATIENT INFORMATION</Text>
        <View style={styles.about}>
          <Grid>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.props.profile.firstName}
                  onChange={target => this.changeValue('firstName', target.nativeEvent.text)}
                  placeholder="First Name *" style={styles.inputHalf}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.props.profile.lastName}
                  onChange={target => this.changeValue('lastName', target.nativeEvent.text)}
                  placeholder="Last Name *" style={styles.inputHalf}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
          </Grid>
          <View style={styles.genderView}>
            <Grid style={styles.switchGrid}>
              <Col style={styles.textContainer}>
                <Text style={styles.label}>Gender</Text>
              </Col>
              <Col style={styles.switchContainer}>
                <Grid>
                  <Col>
                    <Text style={styles.switchOptionText} >MALE </Text>
                  </Col>
                  <Col>
                    <Switch
                      onValueChange={value => this.changeValue('gender', value?'FEMALE':'MALE')}
                      style={styles.switch}
                      thumbTintColor="#ccc"
                      tintColor="#aaa"
                      value={this.props.profile.gender}
                    />
                  </Col>
                  <Col>
                    <Text style={styles.switchOptionText}>FEMALE</Text>
                  </Col>
                </Grid>
              </Col>
            </Grid>
          </View>
          <View style={styles.inputView}>
            <Grid >
              <Col >
                <Text style={styles.dobLabel}>DOB</Text>
              </Col>
              <Col >
                <DatePicker
                  style={{ width: 200, borderWidth: 0,marginTop:0,height:20 }}
                  date={moment(this.props.profile.dob).format('DD/MM/YYYY')}
                  mode="date"
                  placeholder="Date Of Birth *"
                  format="DD/MM/YYYY"
                  minDate="01/01/1990"
                  maxDate={moment().format('DD/MM/YYYY')}
                  confirmBtnText="Select"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      marginLeft: 0,
                      marginTop: 0,
                      height:20,
                      borderColor: "#CCCBCB",
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    },
                    dateText: {
                      borderWidth: 0,
                      marginLeft: 0,
                      marginTop: 0,
                      height:20,
                      fontSize: 15,
                      color: '#333',
                    },
                  }}
                  onDateChange={(date) => { this.changeValue('dob', moment(date,'DD/MM/YYYY')); }}
                />
              </Col>
            </Grid>
          </View>
        </View>
        <Text style={styles.title}>CONTACT</Text>
        <View style={styles.about}>
          <View style={styles.inputView}>
            <Input
              value={this.props.profile.mobile}
              onChange={target => this.changeValue('mobile', target.nativeEvent.text)}
              keyboardType = 'numeric'
              placeholder="Mobile *" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={this.props.profile.email}
              onChange={target => this.changeValue('email', target.nativeEvent.text)}
              placeholder="Email *" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
        </View>
        <Text style={styles.title}>ADDRESS</Text>
        <View style={styles.about}>
          <View style={styles.inputView}>
            <Input
              value={this.props.profile.address}
              onChange={target => this.changeValue('address', target.nativeEvent.text)}
              placeholder="Street" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={this.props.profile.suburbDistrict}
              onChange={target => this.changeValue('suburbDistrict', target.nativeEvent.text)}
              placeholder="Suburb" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
          <Grid>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.props.profile.stateProvince}
                  onChange={target => this.changeValue('stateProvince', target.nativeEvent.text)}
                  placeholder="State" style={styles.inputHalf}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.props.profile.postcode}
                  onChange={target => this.changeValue('postcode', target.nativeEvent.text)}
                  placeholder="Postcode" style={styles.inputHalf}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
          </Grid>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    changeProfileValue: v => dispatch(changeProfileValue(v)),
  };
}

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile
  };
};

export default connect(mapStateToProps, bindAction)(ProfileForm);
