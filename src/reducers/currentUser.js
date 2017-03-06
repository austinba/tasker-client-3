import { browserHistory } from 'react-router';


// this will be removed soon - just here so the demo doesn't break
const initialState = {currentUser: 'austin@qs'};

function currentUserReducer(state = initialState, action) {
  case(action.type) {
    default:
      return state;
  }
}

export default currentUserReducer;
