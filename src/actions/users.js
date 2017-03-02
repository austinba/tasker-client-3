import * as api from '../api';
export const getUsers = () => dispatch => {
  api.getUsers()
    .then(users => dispatch({ type: 'LOAD_USERS_SUCCESS', users }))
    .catch(error => dispatch({ type: 'LOAD_USERS_FAILURE' }));
}
