

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import R from 'ramda';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Header, Content, Text, Icon, Thumbnail, Button, Picker, Item ,Footer} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
import styles from './styles';
import ProfileForm from '../profile-form';
import { DEFAULT_PROFILE, setProfile, updateProfile, createProfile, deleteProfile,selectProfile } from '../../actions/user';
const {
  pushRoute,
} = actions;

class Profiles extends Component {
  static defaultProps = {
    showDelete: true,
    initNewProfile: false,
  }

  static propTypes = {
    showDelete: React.PropTypes.bool,
    user: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    profiles: React.PropTypes.array,
    myProfile: React.PropTypes.object,
    setProfile: React.PropTypes.func,
    saveProfile: React.PropTypes.func,
    deleteProfile: React.PropTypes.func,
    onPop: React.PropTypes.func,
    onChange: React.PropTypes.func,
    initNewProfile: React.PropTypes.bool,
    setNewProfile: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: R.propOr(0, 'patientId', props.myProfile),
      profile: props.myProfile,
    };
    this.pickerChange = this.pickerChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addNewProfile = this.addNewProfile.bind(this);
    this.delete = this.delete.bind(this);
    this.selectProfile = this.selectProfile.bind(this);
  }

  componentDidMount() {
    if (this.props.initNewProfile) {
      this.props.setNewProfile && this.props.setNewProfile(false);
      this.addNewProfile();
    }
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  pickerChange(value) {
    const { onChange } = this.props;
    const profile = R.find(R.propEq('patientId', value), this.props.profiles);
    profile && this.setState({
      selected: profile.patientId,
      profile,
    });
    onChange && onChange(profile);
  }

  submit() {
    const { userId, saveProfile, onChange } = this.props;
    const profile = { ...this.state.profile, userId };
    saveProfile(profile).catch(alert);
    onChange && onChange(profile);
  }

  addNewProfile() {
    this.setState({ selected: 0, profile: DEFAULT_PROFILE });
  }

  delete() {
    this.props.deleteProfile(this.state.profile).then(this.addNewProfile).catch(alert);
  }

  selectProfile(profile){
    console.log("pro = ",profile);
    this.props.selectProfile(profile);
  }
//
//   render() {
//
//     return (
//       <Container>
//         <Image source={bg} style={styles.background} >
//           <HeaderContent />
//           <Content style={styles.container} showsVerticalScrollIndicator={false}>
//             <View style={{ flex: 1 }} >
//               {items}
//             </View>
//           </Content>
//           <Button
//             rounded dark block large
//             onPress={this.addMember}
//             style={styles.addBtn}
//           >
//             <Text style={styles.mainText}>
//               Add member</Text>
//           </Button>
//         </Image>
//       </Container>
//     );
//   }
// }

  render() {

    const { profiles, myProfile, user } = this.props;
    const rightButton = (<Button transparent onPress={this.addNewProfile} >
      <Icon active name="add" />
    </Button>);
    const onPop = this.props.onPop ? () => this.props.onPop(this.state.profile) : null;

    const items = this.props.profiles.map(x => (
      <View key={x.personId}>
        <TouchableOpacity onPress={ () => {this.selectProfile(x)}}>
          <View style={styles.listItem}>
            <Text numberOfLines={2} style={styles.listName}>
              {`${x.firstName} ${x.lastName}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));

    return (
      <Container theme={theme}>
        <HeaderContent/>
        <Content showsVerticalScrollIndicator={false} style={ styles.listContainer}>
          <View style={{ flex: 1 }} >
            {items}
          </View>
        </Content>
        <Footer style={styles.footer}>
            <Button full style={{ borderRadius: 0, margin: 0, borderWidth: 0, backgroundColor: '#00ADEE' }}>
              <Text style={{ fontSize: 14, color: '#fff' }}>Add Member</Text>
            </Button>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    setProfile: profile => dispatch(setProfile(profile)),
    saveProfile: (profile) => {
      if (profile.patientId > 0) {
        return dispatch(updateProfile(profile));
      }
      return dispatch(createProfile(profile));
    },
    deleteProfile: profile => dispatch(deleteProfile(profile)),
    selectProfile: profile => dispatch(selectProfile(profile)),
  };
}

const mapStateToProps = (state) => {
  const { user, defaultProfile } = state.user;
  return {
    navigation: state.cardNavigation,
    myProfile: state.user.profile,
    profiles: state.user.profiles,
    userId: state.user.fatherPersonId,
    user,
  };
};

export default connect(mapStateToProps, bindAction)(Profiles);
