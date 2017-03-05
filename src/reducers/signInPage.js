import R from 'ramda';

function signInPageReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN_PAGE_UPDATE_FIELD':
      return R.assoc(action.name, action.value, state);
    default:
      return state;
  }
}
export default signInPageReducer;
