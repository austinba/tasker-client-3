import { browserHistory } from 'react-router';


// this will be removed soon - just here so the demo doesn't break
const initialState = {userID: 'austin@qs'};

function currentUserReducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

export default currentUserReducer;
