import React, { Component, PropTypes } from 'react';
import { Image, View, Platform, TouchableOpacity } from 'react-native';

import R from 'ramda';
import { Container, Content, Text, Icon, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import moment from 'moment';
import styles from './styles';

const ApptItem = ({ appt, onPress, showAddress }) => {
  const { apptTime, address, clinicName, doctorName } = appt;
  return (
    <View>
      <View style={styles.timelineView}>
        <View style={styles.timelineContent}>
          <Text />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => onPress(appt)}>
          <Grid>
            <Col style={{ flexDirection: 'row' }}>
              <Icon name="ios-time-outline" style={styles.timelineIcon} />
              <View style={{ paddingLeft: 10 }}>
                <Text style={styles.timeText}>{moment(apptTime).format('h:mm a')}</Text>
                <Text style={styles.timeText}>{moment(apptTime).format('ddd, MMM D, YYYY')}</Text>
              </View>
            </Col>
            <Col style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timelineTextHeader}>{clinicName}</Text>
              <Text style={styles.time}>{doctorName}</Text>
            </Col>
          </Grid>
          {showAddress && <Text style={styles.addressText}>{address}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

ApptItem.propTypes = {
  appt: PropTypes.object,
  onPress: PropTypes.func,
  showAddress: PropTypes.bool,
};
export default ApptItem;
