
import React, { Component, PropTypes } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { fetchBookingTypesFromServer, setClickedBookingType } from '../../actions/booking';
import styles from './styles';

const BookingTypeButton = ({ x, i, onPress, selected }) => (
  <Col style={{ alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
    <View style={[styles.bookingTypeView,
      selected && x.bookingTypeId === selected ? styles.viewActived : null]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress && onPress(x.bookingTypeId)}
      >
        <Text style={selected && x.bookingTypeId === selected ? styles.actived : styles.bookingTypeText}>{x.bookingTypeName}</Text>
      </TouchableOpacity>
    </View>
  </Col>
    );

class BookingType extends Component {
  static propTypes = {
    list: PropTypes.array,
    moreType: PropTypes.object,
    selectedType: PropTypes.number,
    getBookingType: PropTypes.func,
    setSelectedType: PropTypes.func,
  }
  componentDidMount() {
    const { getBookingType } = this.props;
    getBookingType && getBookingType();
  }
  render() {
    const contents = this.props.list.map((x, i) =>
      <BookingTypeButton selected={this.props.selectedType} key={x.bookingTypeId} x={x} i={i} onPress={this.props.setSelectedType} />);
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Grid>
          {contents}
        </Grid>
      </ScrollView>);
  }
}

const mapStateToProps = state => ({
  list: state.booking.types,
  moreType: state.booking.moreType,
  selectedType: state.booking.selectedType,
});
const mapDispatchToProps = dispatch => ({
  getBookingType: () => dispatch(fetchBookingTypesFromServer()),
  setSelectedType: x => dispatch(setClickedBookingType(x)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingType);
