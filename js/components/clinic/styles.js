

const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  newsPoster: {

  },
  newsPosterContent: {
    backgroundColor: 'yellow',
    alignSelf: 'flex-end',
  },
  newsPosterHeader: {
    color: 'red',
  },
  contentWrapper: {
    flex: 1,
    minHeight: deviceHeight,
  },
  cover: {
    height: deviceHeight / 3,
  },
  coverImage: {
    height: deviceHeight / 3,
    flexDirection: 'row',
    resizeMode: 'center',
    width: null,
    backgroundColor: '#ddd',
  },
  clinicLogo: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'column',
    width: deviceWidth - 40,
  },
  coverTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  navDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: deviceWidth / 5,
    paddingRight: deviceWidth / 5,
    marginBottom: 15,
  },
  slotsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  timeBtn: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 0,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderColor: primary,
    backgroundColor: primary,
  },
  slotText: {
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    width: (deviceWidth / 5),
  },
  textGrey: {
    color: '#999',
    fontWeight: 'bold',
  },
  disabledTextGrey: {
    color: '#DDD',
    fontWeight: 'bold',
  },
  separate: {
    paddingBottom: 20,
    marginBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    color: '#000',
  },
  changeDate: {
    fontWeight: 'bold',
    fontSize: 18,
  },
};
