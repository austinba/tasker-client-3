import * as api from '../api';
import { browserHistory } from 'react-router';
import * as auth from '../auth';

export const goToPage = page => ({type: 'CREATE_A_TEAM_GOTO_PAGE', page});

export const editField = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  return ({type: 'CREATE_A_TEAM_FIELD_EDIT', field:name, value});
}

export const blurField = (event) => {
  const name = event.target.name;
  return ({type: 'CREATE_A_TEAM_FIELD_BLUR', field:name});
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
        console.log(error);
        dispatch({type: 'CREATE_TEAM_FAIL'});
      });
  }
};
export const unmount = () => ({type: 'CREATE_TEAM_UNMOUNT'})
