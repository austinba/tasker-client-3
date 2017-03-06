import * as api from '../api';
import * as auth from '../auth';

export const signin = (credentials) => (dispatch) => {
  console.log('attempting login')
  const {username, teamdomain, password} = credentials;
  console.log('using', {username, teamdomain, password});

  dispatch({type: 'SIGN_IN_PENDING'});
  api.attemptLogin(username, teamdomain, password)
    .then(body => {
      if(user.jwtToken) {
        auth.signin(user.jwtToken);
        // save the user info if it contains everything needed
        if(user.username && user.teamname && user.firstName && user.lastName) {
          dispatch({type: 'GET_MY_INFO_SUCCESS', user});
        }
        dispatch({type: 'SIGN_IN_SUCCESS'});
      } else {
        dispatch({type: 'SIGN_IN_FAILURE'});
      }
    })
    .catch(error => {
      dispatch({type: 'SIGN_IN_FAILURE'});
    });
};

export const signout = () => {
  auth.signout();
  return {type: 'SIGN_OUT'};
}

export const getMyInfo = (token) = {
  api.getMyInfo(token)
    .then(user => {
      if(user.username && user.teamname && user.firstName && user.lastName) {
        dispatch({type: 'GET_MY_INFO_SUCCESS', user});
      }
    })
}
