function usersReducer(state = {}, action) {
  switch(action.type) {
    case 'LOAD_USERS_SUCCESS':
      return action.users;
    case 'LOAD_USERS_FAILURE':
      console.log('Failed to load users')
      return state;
    default:
      return state;
  }
}

export default usersReducer;
