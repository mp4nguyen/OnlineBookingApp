

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  logo: {
    width: deviceWidth,
    height: 150,
    margin: 0,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iosShadow: {
    width: deviceWidth/2,
    height: 100,
    resizeMode: 'contain',
  },
  inputGrp: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  input: {
    paddingLeft: 10,
    color: '#FFF'
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapBg: {
    width: deviceWidth,
    alignSelf: 'flex-end',
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 3,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  loginBtn: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF'
  },
  otherLinksContainer: {
    flexDirection: 'row',
  },
}
