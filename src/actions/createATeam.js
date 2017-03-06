import * as api from '../api';
import { browserHistory } from 'react-router';
import * as auth from '../auth';
import { validationError } from '../utilities/createATeamValidation';

export const nextPage = (event) => {
  event.preventDefault();
  return ({type: 'CREATE_TEAM_NEXT_PAGE'});
};

export const editField = (event) => (dispatch) => {
  const field = event.target.name;
  const value = event.target.value;

  // if it is the team domain, check it if is available
  if(field === 'teamdomain' && !validationError(field, value) ) {
    dispatch({type: 'TEAM_AVAILABILITY_PENDING' });
    api.doesTeamExist({teamdomain: value}).then(
      response => dispatch({type: 'TEAM_AVAILABILITY_RESPONSE', exists: response.exists === 'true'})
    ).
    catch(() => dispatch({type: 'TEAM_AVAILABILITY_FAILED'}));
  }
  dispatch({type: 'CREATE_A_TEAM_FIELD_EDIT', field, value});
}

export const blurField = (event) => {
  const field = event.target.name;
  return ({type: 'CREATE_A_TEAM_FIELD_BLUR', field});
}

export const submit = (fields, event) => {
  event.preventDefault();
  return dispatch => {
    dispatch({type: 'CREATE_TEAM_IN_PROCESS'})
    api.submitCreateTeamForm(fields)
      .then(user => {
        if(user.jwtToken) {
          auth.signin(user.jwtToken);
          browserHistory.push('/my-tasks');
          dispatch({type: 'CREATE_TEAM_SUCCESS'})
          dispatch({type: 'SIGN_IN_SUCCESS'});
        } else {
          dispatch({type: 'CREATE_TEAM_FAIL'});
        }
      })
      .catch(error => {
        dispatch({type: 'CREATE_TEAM_FAIL'});
      });
  }
};
export const unmount = () => ({type: 'CREATE_TEAM_UNMOUNT'})
