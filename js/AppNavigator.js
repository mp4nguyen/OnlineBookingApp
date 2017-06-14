
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Login from './components/login/';
import Home from './components/home/';
import SignUp from './components/sign-up/';
import SignUpProfile from './components/sign-up-profile/';

import MyProfile from './components/profile';
import Profiles from './components/profiles';

import SideBar from './components/sideBar';
import Settings from './components/settings';

import Clinic from './components/clinic';
import Booking from './components/booking';
import PracticeInformation from './components/booking/practiceInformation';
import PatientProfile from './components/booking/patientProfile';
import BookingProfile from './containers/booking-profile/';
import HealthInsurance from './components/booking/HealthInsurance';
import ConfirmBooking from './components/booking/confirmBooking';
import MyBooking from './components/my-bookings';

import Invoices from './components/invoices';
import NeedHelp from './components/needhelp';
import Search from './components/search/';
import SplashPage from './components/splashscreen/';
import { statusBarColor } from './themes/base-theme';
import AnonymousProfile from './components/booking/anonymousProfile';
import SpinnerView from './components/spinner';
import Appointment from './components/appointment/';
// import upcommingAppointment from './components/upcomming-appointment/';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;


class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home' || routes[routes.length - 1].key === 'login') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'signUp':
        return <SignUp />;
      case 'signUpProfile':
        return <SignUpProfile />;
      case 'profiles':
        return <Profiles />;        
      case 'profile':
        return <MyProfile />;
      case 'sideBar':
        return <SideBar />;
      case 'settings':
        return <Settings />;
      case 'clinic':
        return <Clinic />;
      case 'search':
        return <Search />;
      case 'booking':
        return <Booking />;
      case 'practiceInformation':
        return <PracticeInformation />;
      case 'anonymousProfile':
        return <AnonymousProfile />;
      case 'patientProfile':
        return <PatientProfile />;
      case 'bookingProfile':
        return <BookingProfile />;
      case 'healthInsurance':
        return <HealthInsurance />;
      case 'confirmBooking':
        return <ConfirmBooking />;
      case 'myBooking':
        return <MyBooking />;
      case 'appointment':
        return <Appointment />;
      case 'invoices':
        return <Invoices />;
      case 'needhelp':
        return <NeedHelp />;
      default :
        return <Home />;
    }
  }

  render() {  // eslint-disable-line class-methods-use-this
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle="light-content"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
        <SpinnerView />
      </Drawer>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
