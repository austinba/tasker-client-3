import R from 'ramda';
import { validationError } from '../utilities/createATeamValidation';

// set the initial state
const fieldNames = [
  'email', 'firstName', 'lastName', 'username',
  'password', 'teamName', 'teamdomain' ];
const initialState = {
  page: 1,
  fields: R.reduceRight(  //create an obj[fieldnames] with initial values set
    R.assoc(R.__, {pristine: true, value: '', error: ' '}), {}
  )(fieldNames)
}

const createATeamReducer = (state = initialState, action) => {
  const {type, field, value} = action
  switch(type) {

    case 'CREATE_A_TEAM_GOTO_PAGE':
      return R.evolve({
        page: R.inc,
        error: R.always('')
      });

    case 'CREATE_A_TEAM_FIELD_EDIT':
      return R.pipe(
        R.assocPath(['fields', field, 'value'], value), // update field
        R.assocPath(['fields', field, 'error'], validationError(field, value)) // save any newly created error
      )(state);

    case 'CREATE_A_TEAM_FIELD_BLUR':
      return R.assocPath(['fields', field, 'pristine'], false)(state); // mark field as not pristine

    case 'CREATE_TEAM_UNMOUNT':
      return initialState;

    case 'CREATE_TEAM_IN_PROCESS':
      return R.assoc('inProcess', true)(state);

    case 'CREATE_TEAM_SUCCESS':
      return state;

    case 'CREATE_TEAM_FAIL':
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
