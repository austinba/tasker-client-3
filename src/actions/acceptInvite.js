import * as api from '../api';
import { browserHistory } from 'react-router';
import * as auth from '../auth';
import { validationError } from '../utilities/createATeamValidation';
import R from 'ramda';

export const nextPage = (event) => {
  event.preventDefault();
  return ({type: 'ACCEPT_INVITE_NEXT_PAGE'});
};

export const saveTeamdomain = (teamdomain) =>
  ({type: 'SAVE_TEAM_DOMAIN', teamdomain});

export const getInviteInfo = (fields) => (dispatch) => {
  api.getInviteInfo(fields)
    .then(inviteInfo =>
      console.log(inviteInfo) ||
      dispatch({type: 'INVITE_INFO_SUCCESS', inviteInfo})
    )
    .catch(error =>
      console.log('failed retrieving invite info', error) ||
      dispatch({type: 'INVITE_INFO_FAILED'})
    )
}

export const editField = (event) => (dispatch, getState) => {

  const field = event.target.name;
  const value = event.target.value;

  dispatch({type: 'ACCEPT_INVITE_FIELD_EDIT', field, value});

  // if it is the team domain, check it if is available
  if(field === 'username' && !validationError(field, value)) {
    const email= R.path(['acceptInvite', 'inviteInfo', 'email'] ,getState());
    const teamdomain= R.path(['acceptInvite', 'inviteInfo', 'teamdomain'] ,getState());
    dispatch({type: 'USERNAME_AVAILABILITY_PENDING' });
    if(!teamdomain) return dispatch({type: 'USERNAME_AVAILABILITY_FAILED'});

    api.doesUserExist({teamdomain, username: value}).then(
      response => dispatch({type: 'USERNAME_AVAILABILITY_RESPONSE', exists: response.exists === 'true'})
    ).
    catch(() => dispatch({type: 'USERNAME_AVAILABILITY_FAILED'}));
  }

}

export const blurField = (event) => {
  const field = event.target.name;
  return ({type: 'ACCEPT_INVITE_FIELD_BLUR', field});
}

export const submit = (fields, event) => {
  event.preventDefault();
  return dispatch => {
    dispatch({type: 'ACCEPT_INVITE_IN_PROCESS'})
    api.submitAcceptInvite(fields)
      .then(user => {
        if(user.jwtToken) {
          auth.signin(user.jwtToken);
          browserHistory.push('/my-tasks');
          dispatch({type: 'ACCEPT_INVITE_SUCCESS'})
          dispatch({type: 'SIGN_IN_SUCCESS'});
        } else {
          dispatch({type: 'ACCEPT_INVITE_FAIL'});
        }
      })
      .catch(error => {
        dispatch({type: 'ACCEPT_INVITE_FAIL'});
      });
  }
};
export const unmount = () => ({type: 'ACCEPT_INVITE_UNMOUNT'})
