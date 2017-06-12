
import React, { Component, PropTypes } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Text, Icon, Item, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from './styles';
import { searchClinics,setKeyWords } from '../../actions/booking';

class Search extends Component {
  static propTypes = {
    setKeyWords: PropTypes.func,
    searchClinic: PropTypes.func,
    search: PropTypes.shape({
      keyword: PropTypes.string,
      bookingTypeId: PropTypes.number,
    }),
    searchSuccess: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.searchClinic = this.searchClinic.bind(this);
  }

  searchClinic() {
    this.props.searchClinic(this.props.search).then(this.props.searchSuccess.bind(this)).catch(e => alert('error:'+e));
  }
  render() {
    return (
      <Image style={styles.newsPoster} source={require('../../../images/BG_2.jpg')} >
        <View style={styles.swiperTextContent} >
          <Item rounded style={styles.inputGrp}>
            <Input
              value={this.props.search.keyword} onChange={e => this.props.setKeyWords(e.nativeEvent.text)}
              placeholder="SUBURD, PRACTITIONER, PRACTICE OR PROCEDURE" style={styles.input}
              placeholderTextColor="#000"
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
  setKeyWords: keyword => dispatch(setKeyWords(keyword)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
