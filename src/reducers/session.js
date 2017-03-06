import * as auth from '../auth';
import R from 'ramda';
import {browserHistory} from 'react-router';


const initialState = {isSignedIn: auth.isSignedIn()}
// not a "pure" function: it sets signin state through './auth' (sessionStorage)
// as then retrieves it again. This keeps the two tightly coupled.
function sessionReducer(state = initialState, action) {
  let user;
  switch(action.type) {

    // add to sessionStorage, set 'user' prop, set 'isSignedIn' prop
    case 'SIGN_IN_SUCCESS':
      user = action.user;
      user.userID = `${user.username}@${user.teamdomain}`;
      console.log(user);
      return R.pipe(
        R.assoc('user', user),
        R.assoc('isSignedIn', auth.isSignedIn())
      )(state);

    case 'SIGN_OUT':
        return R.pipe(
          R.dissoc('user'),
          R.assoc('isSignedIn', auth.isSignedIn())
        )(state);

      // run in the case that the sessionStorage has a jwtToken but user info
      // is not present in the store
      case 'GET_MY_INFO_SUCCESS':
        user = action.user;
        user.userID = `${user.username}@${user.teamdomain}`;
        return R.assoc('user', user)(state);

      // not totally sure if this is necessary. Don't want to log the user out
      // in case it's just a connection issue.
      case 'GET_MY_INFO_FAILURE':
        return state;

    default:
      return state;
  }
}
export default sessionReducer;
