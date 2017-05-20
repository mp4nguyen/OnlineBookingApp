
import React, { Component, PropTypes } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Text, Icon, Item, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from './styles';
import { searchClinics } from '../../actions/booking';
class Search extends Component {
  static propTypes = {
    searchClinic: PropTypes.func,
    search: PropTypes.shape({
      keyword: PropTypes.string,
      bookingTypeId: PropTypes.number,
    }),
    searchSuccess: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      keyword: props.search.keyword,
    };
    this.searchClinic = this.searchClinic.bind(this);
  }
  searchClinic() {
    this.props.searchClinic({
      keyword: this.state.keyword,
      bookingTypeId: this.props.search.bookingTypeId,
    }).then(this.props.searchSuccess)
    .catch(e => alert('error'));
  }
  render() {
    return (
      <Image style={styles.newsPoster} source={require('../../../images/BG_2.jpg')} >
        <View style={styles.swiperTextContent} >
          <Item rounded style={styles.inputGrp}>
            <Input
              value={this.state.keyword} onChange={e => this.setState({ keyword: e.nativeEvent.text })}
              placeholder="SUBURD, PRACTITIONER, PRACTICE OR PROCEDURE" style={styles.input}
              placeholderTextColor="#FFF"
            />
          </Item>
          <Grid>
            <Col style={styles.swiperContentBox}>
              <TouchableOpacity style={styles.searchButton} onPress={this.searchClinic}>
                <Icon name="ios-search" style={styles.searchIcon} />
                <Text style={styles.searchText}>SEARCH</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </Image>
    );
  }
}

const mapStateToProps = state => ({
  search: state.booking.search,
});
const mapDispatchToProps = dispatch => ({
  searchClinic: search => dispatch(searchClinics(search)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Search);
