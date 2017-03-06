import * as api from '../api';
import * as auth from '../auth';
import {browserHistory} from 'react-router';

export const signin = (credentials, event) => (dispatch) => {
  event.preventDefault();
  const {username, teamdomain, password} = credentials;

  dispatch({type: 'SIGN_IN_PENDING'});
  api.signin(username, teamdomain, password)
    .then(user => {
      if(user.jwtToken) {
        auth.signin(user.jwtToken);
        browserHistory.push('/my-tasks');
        dispatch({type: 'SIGN_IN_SUCCESS', user});
      } else {
        browserHistory.push('/signin');
        dispatch({type: 'SIGN_IN_FAILURE'});
      }
    })
    .catch(error => {
      browserHistory.push('/signin');
      dispatch({type: 'SIGN_IN_FAILURE'});
    });
};

export const signout = (event) => {
  event.preventDefault();
  auth.signout();
  return {type: 'SIGN_OUT'};
};

export const getMyInfo = (token) => (dispatch) => {
  api.getMyInfo(token)
    .then(user => {
      if(user.username && user.teamname && user.firstName && user.lastName) {
        dispatch({type: 'GET_MY_INFO_SUCCESS', user});
      } else {
        browserHistory.push('/signin');
      }
    }).catch(error => browserHistory.push('/signin')
    )
}
