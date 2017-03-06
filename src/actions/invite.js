import * as api from '../api';

export const editEmail = (event) => {
  const value = event.target.value;
  return {type: 'EDIT_INVITE_EMAIL', value};
}

export const submit = (fields, event) => {
  event.preventDefault();
  return dispatch => {
    dispatch({type: 'INVITING_IN_PROCESS'})
    api.submitInviteForm(fields)
      .then(() => {
        dispatch({type: 'INVITE_SUCCESS'})
      })
      .catch(error => {
        dispatch({type: 'INVITE_FAIL'});
      });
  }
};
export const unmount = () => ({type: 'INVITE_UNMOUNT'})
