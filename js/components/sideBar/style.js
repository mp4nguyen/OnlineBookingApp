
const React = require('react-native');

const { Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

export default {

  links: {
    paddingTop: Platform.OS === 'android' ? 14 : 20,
    paddingBottom: Platform.OS === 'android' ? 14 : 20,
    paddingLeft: Platform.OS === 'android' ? 0 : 10,
    borderBottomWidth: Platform.OS === 'android' ? 0 : 0,
    borderBottomColor: 'transparent',
  },
  linkText: {
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#fff',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary,
  },
  drawerContent: {
    paddingTop: Platform.OS === 'android' ? 20 : 30,
    marginBottom: (Platform.OS === 'ios') ? -50 : -10,
  },
};
