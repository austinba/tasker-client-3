import R from 'ramda';

function signInPageReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN_PAGE_UPDATE_FIELD':
      return R.assoc(action.name, action.value)(state);

    case 'SIGN_IN_PENDING':
      return R.assoc('signInPending', true)(state);

    case 'SIGN_IN_FAILURE':
      return R.path(
        R.assoc('error', 'Failed to sign in. Please try again.');
        R.dissoc('signInPending')
      )(state);
      
    case 'SIGN_IN_SUCCESS':
      return R.dissoc('signInPending')(state);
    default:
      return state;
  }
}
export default signInPageReducer;
