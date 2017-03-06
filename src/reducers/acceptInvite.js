import R from 'ramda';
import { validationError } from '../utilities/createATeamValidation';

// set the initial state
const fieldNames = [
  'firstName', 'lastName', 'username', 'password'];
const initialState = {
  page: 1,
  fields: R.reduceRight(  //create an obj[fieldnames] with initial values set
    R.assoc(R.__, {pristine: true, value: '', error: ' '}), {}
  )(fieldNames)
}

const createATeamReducer = (state = initialState, action) => {
  const {type, field, value} = action
  switch(type) {

    case 'INVITE_INFO_SUCCESS':
    console.log(action.inviteInfo);
      return R.assoc('inviteInfo', action.inviteInfo)(state);

    case 'SAVE_TEAM_DOMAIN':
      return R.assoc('teamdomain', action.teamdomain)(state);

    case 'USERNAME_AVAILABILITY_PENDING':
      return R.assoc('pendingUserLookup', true)(state);

    case 'USERNAME_AVAILABILITY_RESPONSE':
      return R.pipe(
        R.assoc('usernameAvailable', !action.exists),
        R.assoc('pendingUserLookup', false)
      )(state)

    case 'USERNAME_AVAILABILITY_FAIL':
      return R.pipe(
        R.assoc('usernameAvailable', true),
        R.assoc('error', 'Cannot lookup team availability'),
        R.assoc('pendingUserLookup', false)
      )(state)

    case 'ACCEPT_INVITE_NEXT_PAGE':
      return R.evolve({
        page: R.inc,
        error: R.always('')
      })(state);

    case 'ACCEPT_INVITE_FIELD_EDIT':
      return R.pipe(
        R.assocPath(['fields', field, 'value'], value), // update field
        R.assocPath(['fields', field, 'error'], validationError(field, value)) // save any newly created error
      )(state);

    case 'CREATE_A_TEAM_FIELD_BLUR':
      return R.assocPath(['fields', field, 'pristine'], false)(state); // mark field as not pristine

    case 'ACCEPT_INVITE_UNMOUNT':
      return initialState;

    case 'ACCEPT_INVITE_IN_PROCESS':
      return R.assoc('inProcess', true)(state);

    case 'ACCEPT_INVITE_SUCCESS':
      return state;

    case 'ACCEPT_INVITE_FAIL':
      return R.pipe(
        R.assoc('inProcess', false),
        R.assoc('page', 1),
        R.assoc('error', 'Something went wrong and we couldn\'t create the team. Please try again.')
      )(state)

    default:
      return state;
  }
}

export default createATeamReducer;
