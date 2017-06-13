
import React, { Component, PropTypes } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Text, Picker, Item } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { fetchBookingTypesFromServer, setClickedBookingType } from '../../actions/searchClinic';
import styles from './styles';
import R from 'ramda';


const BookingTypeButton = ({ x, i, onPress, selected }) => (
  <View
    style={[styles.bookingTypePanel,
      i < 3 ? styles.noMarginTop : null,
      selected && x.bookingTypeId === selected ? styles.actived : null,
    ]}
  >
    <View style={styles.bookingTypeView}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress && onPress(x)}
        style={styles.slide}
      >
        <Grid>
          <Col style={styles.bookingTypeButton}>
            <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={{ uri: x.icon }} />
            <Text style={styles.bookingTypeText}>{x.bookingTypeName}</Text>
          </Col>
        </Grid>
      </TouchableOpacity>
    </View>
  </View>
  );


const RenderMoreButton = ({ x, list, onPress, selected }) => (
  <View
    style={[styles.bookingTypePanel,
      selected && R.any(R.propEq('bookingTypeId', selected))(list) ? styles.actived : null,
    ]}
  >
    <View style={styles.bookingTypeView}>
      <Grid>
        <Col style={styles.bookingTypeButton}>
          <Image style={{ height: 40, width: 40, resizeMode: 'contain' }} source={{ uri: x.icon }} />
          <Text style={styles.bookingTypeText}>More</Text>
          <Picker
            supportedOrientations={['portrait', 'landscape']}
            iosHeader="Select booking type"
            mode="dropdown"
            selectedValue={selected}
            style={styles.picker}
            textStyle={styles.pickerText}
            onValueChange={onPress}
          >
            {list.map((y, i) =>
              <Item label={y.bookingTypeName} value={y.bookingTypeId} key={`i_${i}`} />
            )}
          </Picker>
        </Col>
      </Grid>
    </View>
  </View>
);

class BookingType extends Component {
  static propTypes = {
    list: PropTypes.array,
    moreType: PropTypes.object,
    selectedType: PropTypes.number,
    getBookingType: PropTypes.func,
    setSelectedType: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.selectedBookingType = this.selectedBookingType.bind(this);
  }
  componentDidMount() {
    const { getBookingType } = this.props;
    getBookingType && getBookingType();
  }

  selectedBookingType(value) {
    this.props.setSelectedType(value);
  }
  render() {
    const list = this.props.list;
    const contents = list.map((x, i) =>
     i < 5
      ? <BookingTypeButton selected={this.props.selectedType} key={x.bookingTypeId} x={x} i={i} onPress={() => this.props.setSelectedType(x.bookingTypeId)} />
      : i == 5 && list.length >= 6
        ? <RenderMoreButton selected={this.props.selectedType} x={this.props.moreType} key={x.bookingTypeId} list={[...R.slice(5, list.length, list), this.props.moreType]} onPress={this.selectedBookingType} />
        : list.length >= 6 ? null : <BookingTypeButton selected={this.props.selectedType} key={x.bookingTypeId} x={x} i={i} onPress={() => this.props.setSelectedType(x.bookingTypeId)} />
      );

    return (<View style={styles.bookingTypeContainer}>
      {contents}
    </View>);
  }
}

const mapStateToProps = state => ({
  list: state.searchClinic.types,
  moreType: state.searchClinic.moreType,
  selectedType: state.searchClinic.searchCriteria.bookingTypeId,
});
const mapDispatchToProps = dispatch => ({
  getBookingType: () => dispatch(fetchBookingTypesFromServer()),
  setSelectedType: x => dispatch(setClickedBookingType(x)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookingType);
