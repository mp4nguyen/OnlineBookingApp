import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/profile';
import R from 'ramda';


const mapStateToProps = (state) => {
  const { user, defaultProfile } = state.user;
  return {
    navigation: state.cardNavigation,
    myProfile: defaultProfile,
    profiles: user.account.profile.relationships && [defaultProfile, ...user.account.profile.relationships] || [defaultProfile],
    userId: user.account.personId,
    user,
  };
};

export default connect(mapStateToProps)(Profile);
