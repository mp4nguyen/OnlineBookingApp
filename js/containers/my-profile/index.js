import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/profile';
import R from 'ramda';


const mapStateToProps = (state) => {
  const { user, defaultProfile } = state.user;
  return {
    navigation: state.cardNavigation,
    myProfile: user && R.find(R.propEq('patientId', user.patientId), user.profiles) || defaultProfile,
    profiles: user.profiles && [defaultProfile, ...user.profiles] || [defaultProfile],
    userId: user.userId,
    user,
  };
};

export default connect(mapStateToProps)(Profile);
