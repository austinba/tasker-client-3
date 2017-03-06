import R from 'ramda';
import emailValidate from 'email-validator';

const initialState = {
  validationError: ' '
}

function invitePageReducer(state = initialState, action) {
  switch(action.type) {
    case 'EDIT_INVITE_EMAIL':
      return R.pipe(
        R.assoc('email', action.value),
        R.assoc('validationError', (!emailValidate.validate(action.value) && 'Email doesn\'t seem to be valid'))
      )(state);
    case 'INVITING_IN_PROCESS':
      return R.assoc('pending', true)(state);
    case 'INVITE_SUCCESS':
      return R.pipe(
        R.assoc('pending', false),
        R.assoc('success', true)
      )(state);
    case 'INVITE_FAIL':
      return R.pipe(
        R.assoc('pending', false),
        R.assoc('error', 'Sorry, failed to send invite to user for some reason. :( Please try again.')
      )(state);
    case 'INVITE_UNMOUNT':
      return {};
    default:
      return state;
  }
}
export default invitePageReducer;
