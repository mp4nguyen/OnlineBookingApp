

import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, Item, Input, View } from 'native-base';
import ProgressBar from './../loaders/ProgressBar';
import styles from './styles';


class AppointmentForm extends Component {

  static propTypes = {
    detail: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }
  render() {
    const { symtoms, diagnotics, prescription, nextAppt, note } = this.props.detail;
    return (
      <View style={styles.formContainer}>
        <Item style={styles.inputGrp}>
          <Text style={styles.inputText}>SYMTOMS {symtoms}</Text>
        </Item>
        <ProgressBar style={styles.progress} color="#fff" progress={25} />
        <Item style={styles.inputGrp}>
          <Text style={styles.inputText}>PRESCRIPTIONS {prescription}</Text>
        </Item>
        <ProgressBar style={styles.progress} color="#fff" progress={25} />
        <Item style={styles.inputGrp}>
          <Text style={styles.inputText}>DIAGNOTICS {diagnotics}</Text>
        </Item>
        <ProgressBar style={styles.progress} color="#fff" progress={25} />
        <Item style={styles.inputGrp}>
          <Text style={styles.inputText}>NEXT APPOINTMENT/PLAN {nextAppt}</Text>
        </Item>
        <ProgressBar style={styles.progress} color="#fff" progress={25} />
        <Item style={styles.inputGrp}>
          <Text style={styles.inputText}>NOTE {note}</Text>
        </Item>
        <ProgressBar style={styles.progress} color="#fff" progress={25} />
      </View>
    );
  }
}
export default AppointmentForm;
