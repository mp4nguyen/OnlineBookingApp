

const React = require('react-native');

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const primary = require('../../themes/variable').brandPrimary;

export default {
  header: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    elevation: 0,
  },
  signupContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  footer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  formContainer: {
    justifyContent: 'center',
  },
  signupHeader: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputGrp: {
    flexDirection: 'row',
    borderWidth: 0,
    marginBottom: 0,
  },
  input: {
    paddingLeft: 10,
    color: '#FFF',
  },
  progress: {
    marginLeft: 35,
    marginBottom: 10,
    marginTop: -5,
  },
  label: {
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  signupBtn: {
    height: 50,
    marginTop: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  termsText: {
    alignSelf: 'center',
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EFF',
  },
  termsButton: {
    marginTop: 15,
    marginBottom: 25,
  },
};
