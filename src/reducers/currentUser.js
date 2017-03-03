import { currentUser } from './initialState';

function currentUserReducer(state = currentUser, action) {
  switch(action.type) {
    default:
      return state;
  }
}
export default currentUserReducer;
