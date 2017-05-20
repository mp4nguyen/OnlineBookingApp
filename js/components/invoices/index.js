import React, { Component } from 'react';
import { Image, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Container, Content, Text, Icon, Item, Input } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import moment from 'moment';
import { openDrawer } from '../../actions/drawer';
import HeaderContent from './../headerContent/';
import { getInvoices } from '../../actions/invoice';
import styles from './styles';
const bg2 = require('../../../images/BG_3.jpg');
class Invoices extends Component {
  static propTypes = {
    list: React.PropTypes.array,
    loadInvoices: React.PropTypes.func,
  }
  componentDidMount() {
    this.props.loadInvoices();
  }
  render() {
    return (
      <Container>
        <Image source={require('../../../images/glow2.png')} style={styles.container} >
        <HeaderContent />
        <View style={styles.overviewHeaderContainer}>
          <Image source={bg2} style={styles.imagebg}>
            <Text style={styles.overviewHeader}>INVOICES</Text>
          </Image>
        </View>

        <View style={{ ...styles.currentWrapper, ...styles.border }}>
          <Text style={styles.title}>CURRENT BALANCE </Text>
          <Text style={styles.currentbalance}> $20023</Text>
        </View>
        <View style={styles.currentWrapper}>
          <Text style={styles.title}>RECENT INVOICE </Text>
        </View>
        <Content showsVerticalScrollIndicator={false}>
          {!!this.props.list && this.props.list.map(({ apptId, clinicName, doctorName, aptTime, firstName, lastName, payment, amount }) => (
            <View key={apptId} style={styles.invoiceDetail}>
              <Grid>
                <Col>
                    <Text style={styles.primaryText}>{firstName} {lastName}</Text>
                    <Text style={styles.normalText}>{clinicName}</Text>
                    <Text style={styles.normalText}>{doctorName}</Text>
                    <Text style={styles.normalText}>{moment(aptTime).format('h:mm A | ddd, MMM d')}</Text>
                  </Col>
                <Col style={styles.rightColumn}>
                    <View style={styles.border}>
                      <Text style={styles.primaryText}>${amount}</Text>
                    </View>
                    <Text style={styles.underline}>AMOUNT</Text>
                    <View style={styles.border}>
                      <Text style={styles.primaryText}>${payment}</Text>
                    </View>
                    <Text style={styles.underline}>PAYMENT</Text>
                  </Col>
              </Grid>
            </View>
            )
          )}
        </Content>
      </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    loadInvoices: () => dispatch(getInvoices()),
  };
}
const mapStateToProps = state => ({
  list: state.invoice.list,
});

export default connect(mapStateToProps, bindAction)(Invoices);
