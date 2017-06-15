

import React, { Component } from 'react';
import { Image, TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { Grid, Col } from 'react-native-easy-grid';
import { actions } from 'react-native-navigation-redux-helpers';
import { DEFAULT_PROFILE as defaultProfile } from '../../actions/user';
import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';
//import {Icon2} from 'react-native-vector-icons/FontAwesome';

import ProgressBar from './../loaders/ProgressBar';
import styles from './styles';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
const getValue = target => R.pathOr(target, ['nativeEvent', 'text'], target);
class ProfileForm extends Component {

  static propTypes = {
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    profile: React.PropTypes.object,
    onChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      ...(props.profile || defaultProfile),
    };
    this.changeValue = this.changeValue.bind(this);
  }
  componentWillReceiveProps(next) {
    this.setState({
      ...next.profile,
    });
  }
  changeValue(input) {
    const that = this;
    return (target) => {
      const profile = {
        ...that.state,
        [input]: getValue(target),
      };
      that.setState(profile);
      that.props.onChange && that.props.onChange(profile);
    };
  }

/*

      <View style={styles.contentWrapper}>
        <Text style={styles.title}>ATTENDED THIS PRACTICE</Text>
        <View style={styles.about}>
          <TouchableOpacity
            style={styles.radioBtn}
            onPress={() => this.props.updateBooking({ aboutThisPracice: true })}
          >
            <Text style={styles.buttonText}>Yes</Text>
            <Radio selected={aboutThisPracice} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioBtn}
            onPress={() => this.props.updateBooking({ aboutThisPracice: false })}
          >
            <Text style={styles.buttonText}>No</Text>
            <Radio selected={!aboutThisPracice} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>APPOINTMENT</Text>
        <View style={styles.about}>
          <View style={styles.radioBtn}>
            <Text style={styles.greyText}>Type</Text>
            <View style={{ flexDirection: 'row' }}>
              <Picker
                supportedOrientations={['portrait', 'landscape']}
                iosHeader="Select appointment type"
                mode="dropdown"
                selectedValue={aptType}
                style={styles.picker}
                textStyle={styles.pickerText}
                onValueChange={value => this.props.updateBooking({ aptType: value })}
              >
                <Item label="General Appointment" value="isGeneralAppointment" />
                <Item label="Illness" value="isIllness" />
                <Item label="Car Accident" value="isCarAccident" />
                <Item label="Medical Certificate" value="isMedicalCertificate" />
                <Item label="Non Workplace Injury" value="isNonWorkplaceInjury" />
                <Item label="Workplace Injury" value="isWorkplaceInjury" />
                <Item label="Prescription" value="isPrescription" />
                <Item label="Unsure/Other" value="isUnsureOrOther" />
              </Picker>
              <Icon name="ios-arrow-forward" style={{ width: 10, color: '#989898', fontSize: 20, marginLeft: 10, lineHeight: 24 }} />
            </View>
          </View>

          <Input
            value={this.state.reasonForApt}
            onChange={e => this.setState({ reasonForApt: e.nativeEvent.text })}
            placeholder="Reason for appointment (optional)" style={styles.input}
            placeholderTextColor="#CCCBCB"
          />
        </View>
        <Text style={{ textAlign: 'center', padding: 30, fontSize: 13, color: 'red' }}> Is this an emergency ?</Text>
      </View>

  */
  render() {
    return (


      <View style={styles.contentWrapper}>
        <Text style={styles.title}>PATIENT INFORMATION</Text>
        <View style={styles.about}>
          <Grid>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.state.email}
                  onChange={this.changeValue('firstName}')}
                  placeholder="First Name" style={styles.input}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.state.email}
                  onChange={this.changeValue('lastName}')}
                  placeholder="Last Name" style={styles.input}
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
                      onValueChange={this.changeValue('gender')}
                      style={styles.switch}
                      thumbTintColor="#ccc"
                      tintColor="#aaa"
                      value={this.state.gender}
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
                  date={moment(this.state.dob).format('DD/MM/YYYY')}
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
                  onDateChange={this.changeValue('dob')}
                />
              </Col>
            </Grid>
          </View>
        </View>
        <Text style={styles.title}>CONTACT</Text>
        <View style={styles.about}>
          <View style={styles.inputView}>
            <Input
              value={this.state.firstName}
              onChange={this.changeValue('mobile')}
              placeholder="Mobile" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={this.state.firstName}
              onChange={this.changeValue('email')}
              placeholder="Email" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
        </View>
        <Text style={styles.title}>ADDRESS</Text>
        <View style={styles.about}>
          <View style={styles.inputView}>
            <Input
              value={this.state.email}
              onChange={this.changeValue('address}')}
              placeholder="Street" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={this.state.email}
              onChange={this.changeValue('suburbDistrict}')}
              placeholder="Suburb" style={styles.input}
              placeholderTextColor="#CCCBCB"
            />
          </View>
          <Grid>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.state.email}
                  onChange={this.changeValue('stateProvince}')}
                  placeholder="State" style={styles.input}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
            <Col>
              <View style={styles.inputView}>
                <Input
                  value={this.state.email}
                  onChange={this.changeValue('postCode}')}
                  placeholder="Postcode" style={styles.input}
                  placeholderTextColor="#CCCBCB"
                />
              </View>
            </Col>
          </Grid>
        </View>
      </View>
      /*
      <View style={styles.signupContainer}>
        <View style={styles.formContainer}>
          <Item style={styles.inputGrp}>
            <Icon name="person" style={styles.iconColor}/>
            <Input
              value={this.state.firstName}
              onChange={this.changeValue('firstName')}
              placeholder="First Name" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name="person" style={styles.iconColor}/>
            <Input
              value={this.state.lastName}
              onChange={this.changeValue('lastName')}
              placeholder="Last Name" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name= {this.state.gender?"female":"male"}  style={styles.iconColor} />
            <Grid style={styles.switchGrid}>
              <Col style={styles.textContainer}>

                <Text style={styles.switchText}>Gender</Text>
              </Col>
              <Col style={styles.switchContainer}>
                <Grid>
                  <Col>
                    <Text style={styles.switchOptionText} >MALE </Text>
                  </Col>
                  <Col>
                    <Switch
                      onValueChange={this.changeValue('gender')}
                      style={styles.switch}
                      thumbTintColor="#ccc"
                      tintColor="#aaa"
                      value={this.state.gender}
                    />
                  </Col>
                  <Col>
                    <Text style={styles.switchOptionText}>FEMALE</Text>
                  </Col>
                </Grid>
              </Col>
            </Grid>
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name="ios-calendar-outline" style={styles.iconColor} />
            <DatePicker
              style={{ width: 200, borderWidth: 0 }}
              date={moment(this.state.dob).format('DD/MM/YYYY')}
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
                  marginLeft: 8,
                  borderColor: undefined,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                },
                dateText: {
                  fontSize: 15,
                  color: '#333',
                },
              }}
              onDateChange={this.changeValue('dob')}
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name="mail-open" style={styles.iconColor}/>
            <Input
              value={this.state.email}
              onChange={this.changeValue('email')}
              placeholder="Email Address" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name="ios-pin-outline" style={styles.iconColor}/>
            <Input
              value={this.state.suburb}
              onChange={this.changeValue('suburb')}
              placeholder="Suburb" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name="ios-pin-outline" style={styles.iconColor}/>
            <Input
              value={this.state.address}
              onChange={this.changeValue('address')}
              placeholder="Street" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />
          <Item style={styles.inputGrp}>
            <Icon name="ios-pin-outline" style={styles.iconColor}/>
            <Input
              value={this.state.postCode}
              onChange={this.changeValue('postCode')}
              placeholder="PostCode" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <ProgressBar style={styles.progress} color="#fff" progress={100} />

        </View>
      </View>
      */
    );
  }
}

export default ProfileForm;
