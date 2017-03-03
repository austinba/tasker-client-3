import R from 'ramda';

function usersReducer(state = {}, action) {
  switch(action.type) {
    case 'LOAD_USERS_SUCCESS':
      return R.assoc('allUsers', action.users)(state);
    case 'LOAD_USERS_FAILURE':
      console.log('Failed to load users')
      return state;
    case 'RECEIVE_RECENT_USERS_LIST':
      return R.assoc('recentUsers', action.recentUsers)(state);
    default:
      return state;
  }
}

export default usersReducer;
