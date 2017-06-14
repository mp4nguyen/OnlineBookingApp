import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Slider, Dimensions } from 'react-native';
import { Container, Header, Content, Text, Button, Icon, Body, H3, Footer, ListItem, Radio, Item, Picker, Input } from 'native-base';
import styles from './styles';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const primary = require('../../themes/variable').brandPrimary;



class BookingFooter extends Component {

  static propTypes = {
    step: React.PropTypes.int,
    continueFunc: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      steps: [
              "Appointment Information",
              "Clinic Information",
              "Patient Information",
              "Confirm Booking"
              ],
    };
  }


  render() {
    return (
          <Footer style={this.props.continueFunc ? styles.footer:styles.footer2}>
            {
              this.props.continueFunc &&
              <Button full onPress={this.props.continueFunc} style={{ borderRadius: 0, margin: 0, borderWidth: 0, backgroundColor: '#00ADEE' }}>
                <Text style={{ fontSize: 14, color: '#fff' }}>Continue Booking</Text>
              </Button>
            }
            <View style={styles.footerPanel}>
              <Text style={styles.text}>{this.state.steps[this.props.step]}</Text>
              <View style={styles.wrap}>
                {
                  this.state.steps.map((step,index)=>{
                    return(
                        <View key={index} style={styles.wrap}>
                          <View style={this.props.step >= index ? [styles.cycle, styles.cycleFull] : styles.cycle} />
                          {
                            (this.state.steps.length -1 ) > index &&
                            <View style={styles.line} />
                          }
                        </View>
                    )
                  })
                }
              </View>
            </View>
          </Footer>
    );
  }
}



export default (BookingFooter);
