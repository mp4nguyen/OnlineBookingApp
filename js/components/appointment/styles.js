

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  header: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    elevation: 0,
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  formContainer: {
    justifyContent: 'center',
    width: deviceWidth - 10,
  },
  inputGrp: {
    flexDirection: 'row',
    borderWidth: 0,
    marginBottom: 0,
  },
  input: {
    paddingLeft: 10,
    color: '#FFF',
    fontSize: 12,
  },
  inputText: {
    paddingLeft: 10,
    paddingTop: 15,
    color: '#FFF',
    fontSize: 12,
  },
  progress: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  time: {
    paddingTop: 20,
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 10,
  },
  clinic: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  address: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  phone: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 15,
  },
  name: {
    color: '#fff',
    fontSize: 17,

  },
  alias: {
    color: '#fff',
    fontSize: 10,
  },
  mapContainer: {
    position: 'absolute',
    top: (deviceHeight / 2) + 40,
    left: 0,
    right: 0,
    bottom: 0,
  },
  maps: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contents: {
    flex: 1,
  },
};
