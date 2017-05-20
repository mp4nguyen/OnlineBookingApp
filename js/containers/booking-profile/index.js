import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profile from '../../components/profile';
import R from 'ramda';
import { updateBooking, setNewProfile } from '../../actions/booking';

const mapDispatchToProps = dispatch => ({
  onChange: profile => dispatch(updateBooking({ profile })),
  setNewProfile: value => dispatch(setNewProfile(value)),
});

const mapStateToProps = (state) => {
  const { user, defaultProfile } = state.user;
  return {
    navigation: state.cardNavigation,
    myProfile: state.booking.booking.profile,
    profiles: user.profiles && [defaultProfile, ...user.profiles] || [defaultProfile],
    userId: user.userId,
    user,
    showDelete: false,
    initNewProfile: state.booking.initNewProfile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
