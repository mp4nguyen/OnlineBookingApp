

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const primary = require('../../themes/variable').brandPrimary;
export default {
  searchBar: {
    backgroundColor: '#00ADEE',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  anotherBar: {
    backgroundColor: '#2F63AD',
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingTypeView: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  viewActived: {
    borderBottomColor: '#fff',
  },
  actived: {
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
    alignSelf: 'flex-start',
    paddingBottom: 5,
  },
  address: {
    color: '#ccc',
    alignSelf: 'flex-start',
    fontSize: 13,
    paddingBottom: 5,
  },
  distance: {
    color: '#333',
    fontSize: 12,
    alignSelf: 'center',
  },
  slotApt: {
    color: 'red',
    alignSelf: 'flex-start',
    fontSize: 13,
  },
  textItem: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  listItem: {
    padding: 0,
    paddingLeft: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  moreSlots: {
    color: '#000',
    fontSize: 13,
  },
  icon: {
    color: '#999',
    fontSize: 14,
  },
  bookingTypeText: {
    color: '#fff',
  },
  anotherText: {
    fontSize: 14,
    color: '#fff',
  },
  anotherIcon: {
    fontSize: 18,
    marginRight: 5,
  },
};
