

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
  },
  formContainer: {
    justifyContent: 'center',
  },
  inputGrp: {
    flexDirection: 'row',
    borderWidth: 0,
    marginBottom: 0,
  },
  iconColor: {
    color: '#333',
    marginLeft: 20,
  },

  progress: {
    marginLeft: 35,
    marginBottom: 5,
    marginTop: -5,
  },
  label: {
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  switch: {
    transform: Platform.OS === 'android' ? undefined : [{ scaleX: 0.75 }, { scaleY: 0.75 }],
    alignSelf: 'flex-end',
    marginTop: -5,
    paddingTop: Platform.OS === 'android' ? 0 : 10,
    paddingBottom: 10,
  },
  switchOptionText: {
    fontSize: 11,
    paddingTop: 5,
    color: '#555',
    textAlignVertical: 'bottom',
  },
  switchGrid: {
    marginBottom: 5,
    marginTop: 10,
  },
  switchText: {
    color: '#333',
    paddingLeft: 20,
    paddingTop: Platform.OS === 'android' ? 3 : 0,
  },
  aswitchText: {
    color: '#222',
    fontWeight: 'bold',
  },

  contentWrapper: {
    flex: 1,
    minHeight: deviceHeight - 160,
  },
  title: {
    color: '#005D80',
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 5,
  },
  about: {
    backgroundColor: '#fff',
  },
  genderView: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  inputView: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  input: {
    color: '#000',
    height: 40,
    width: deviceWidth - 20,
    flex: null,
    paddingLeft: 20
  },
  label: {
    color: '#333',
    paddingLeft: 20,
  },
  dobLabel: {
    color: '#333',
    height: 30,
    marginTop: 10,
    paddingLeft: 20,
  },
};
