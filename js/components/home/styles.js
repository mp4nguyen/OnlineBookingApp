

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  newsContent: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  newsHeader: {
    color: '#444',
    fontWeight: 'bold',
  },
  newsLink: {
    color: '#666',
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  newsTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    alignSelf: 'flex-end',
  },
  newsTypeText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  newsPoster: {
    height: null,
    width: null,
    resizeMode: 'cover',
    flex: 1,
    position: 'relative',
  },
  newsPosterHeader: {
    fontWeight: '900',
  },
  newsPosterLink: {
    opacity: 0.8,
    fontSize: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  newsPosterTypeView: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    alignSelf: 'flex-end',
  },
  newsPosterTypeText: {
    opacity: 0.8,
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  timeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === 'android' ? 15 : 0,
    paddingLeft: Platform.OS === 'android' ? 0 : 20,
    paddingRight: 10,
    marginTop: Platform.OS === 'android' ? -1 : -3,
    color: '#666',
  },
  headertimeIcon: {
    fontSize: 20,
    marginLeft: Platform.OS === 'android' ? 15 : 0,
    paddingLeft: Platform.OS === 'android' ? 0 : 20,
    paddingRight: 10,
    marginTop: Platform.OS === 'android' ? -1 : 0,
    color: '#fff',
  },
  slide: {
    flex: 1,
    width: null,
    backgroundColor: 'transparent',
  },
  swiperTextContent: {
    position: 'absolute',
    bottom: -5,
    padding: 20,
  },
  swiperDot: {
    backgroundColor: 'rgba(0,0,0,.8)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0,
  },
  swiperActiveDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 0,
  },
  swiperContentBox: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  logoHeader: {
    width: 20,
    height: 28,
    alignSelf: 'center',
  },
  text: {
    fontSize: 15,
    color: '#000',
    marginBottom: 10,
  },
  header: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: (Platform.OS === 'ios') ? undefined : -30,
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  btnHeader: {
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: 'contain',
  },
  bookingTypeButton: {
    alignItems: 'center',
  },
  bookingTypeView: {
    flex: 1,
  },
  bookingTypeText: {
    color: '#4e4e4e',
    marginTop: 5,
  },
  bookingTypeContainer: {
    flex: 1,
    flexDirection: 'row',
    width: deviceWidth - 30,
    margin: 15,
    flexWrap: 'wrap',
    backgroundColor: '#cccbcb',
    justifyContent: 'space-between',
  },
  bookingTypePanel: {
    paddingTop: 10,
    paddingBottom: 5,
    width: (deviceWidth - 30 - 2) / 3,
    backgroundColor: '#fff',
    height: 90,
    marginTop: 1,
  },
  noMarginTop: {
    marginTop: 0,
  },
  noMarginRight: {
    marginTop: 0,
  },
  actived: {
    backgroundColor: '#f2f2f2',
  },
  inputGrp: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 0,
    borderColor: 'transparent',
    width: deviceWidth - 40,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 5,
    lineHeight: 24,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  picker: {
    position: 'absolute',
    top: -75,
    left: -((deviceWidth - 30 - 2) / 3) / 2,
    width: (deviceWidth - 30 - 2) / 3,
    height: 90,
    margin: 0,
    padding: 0,
  },
  pickerText: {
    opacity: 0,
  },
};
