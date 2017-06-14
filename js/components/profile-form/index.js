

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
  render() {
    return (
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
    );
  }
}

export default ProfileForm;
