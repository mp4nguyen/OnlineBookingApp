

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
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    minHeight: deviceHeight - 160,
  },
  aptSection: {
    backgroundColor: '#00ADEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#fff',
  },
  time: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clinicText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: primary,
    borderWidth: 0,
    borderTopWidth: 0,
  },
  footerPanel: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrap: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cycle: {
    borderWidth: 1,
    borderColor: '#fff',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  cycleFull: {
    backgroundColor: '#fff',
  },
  line: {
    width: 25,
    height: 1,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  title: {
    color: '#005D80',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  about: {
    backgroundColor: '#fff',
  },
  radioBtn: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
  },
  greyText: {
    color: '#CCCBCB',
  },
  picker: {
    padding: 0,
    height: null,
  },
  input: {
    color: '#000',
    height: 40,
    width: deviceWidth - 20,
    flex: null,
    paddingLeft: 20,
    borderBottomWidth: 0,
    borderBottomColor: null,
  },
  pickerText: {
    color: '#0091C7',
    fontFamily: 'utm daxline',
    fontSize: 14,
    lineHeight: 24,
  },
  confirmText: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  term: {
    fontSize: 12,
    padding: 20,
    textAlign: 'center',
  },
  complete: {
    borderRadius: 5,
    margin: 0,
    borderWidth: 0,
    backgroundColor: primary,
    alignSelf: 'center',
    height: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  detailWrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  detailTime: {
    fontSize: 13,
    fontWeight: 'bold',
    color: primary,
  },
  detailPrimary: {
    fontSize: 13,
  },
  detailSecondary: {
    fontSize: 13,
    color: '#999',
  },
  aboutText: {
    color: '#B6B7B7',
    margin: 20,
  },
  patientName: {
    color: '#004E6F',
    fontWeight: 'bold',
    width: deviceWidth - 40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonTextPrimary: {
    color: primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  radioBtnPrimary: {
    marginTop: 20,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  address: {
    paddingLeft: 25,
    fontSize: 15,
    textAlign: 'left',
  },
};
