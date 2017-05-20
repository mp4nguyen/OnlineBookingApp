const React = require('react-native');

const { Dimensions, Platform } = React;

const primary = require('../../themes/variable').brandPrimary;

const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fff',
  },
  overviewHeaderContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  overviewHeader: {
    color: '#fff',
    fontSize: 22,
    paddingBottom: 10,
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
  },
  overviewHead: {
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  title: {
    color: '#000',
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  currentbalance: {
    flex: 1,
    textAlign: 'right',
    color: primary,
    fontWeight: 'bold',
    fontSize: 25,
  },
  currentWrapper: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  invoiceDetail: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  primaryText: {
    color: primary,
    fontWeight: 'bold',
    fontSize: 20,
  },
  normalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  underline: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  imagebg: {
    padding: 20,
    paddingTop: 30,
    height: 90,
    resizeMode: 'center',
  },
};
