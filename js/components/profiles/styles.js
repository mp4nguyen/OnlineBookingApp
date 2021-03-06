

const React = require('react-native');

const { Platform, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;
const primary = require('../../themes/variable').brandPrimary;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  profileInfoContainer: {
    backgroundColor: primary,
    paddingTop: 10,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: primary,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  profileUser: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  profileUserInfo: {
    alignSelf: 'center',
    opacity: 0.8,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  linkTabs: {
    backgroundColor: '#fff',
  },
  linkTabs_header: {
    padding: 15,
    alignSelf: 'center',
  },
  linkTabs_tabCounts: {
    fontSize: 22,
    fontWeight: 'bold',
    color: primary,
    alignSelf: 'center',
    paddingBottom: Platform.OS === 'android' ? 3 : 0,
  },
  linkTabs_tabName: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: (deviceWidth < 330) ? 13 : 15,
  },
  newsImage: {
    width: 100,
    height: 120,
  },
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
  control: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signupBtn: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    width: (deviceWidth - 50) / 2,
  },
  picker: {
    flex: 1,
  },
  pickerText: {
    color: '#fff',
  },
  selectedPatient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 20,
  },
  addBtn: {
    marginTop: 10,
    margin: 20,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  listItem: {
    marginTop: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  listName: {
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: primary,
    borderWidth: 0,
    borderTopWidth: 0,
    height: 45,
    flexDirection: 'column',
  },
};
