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
      return {...state, page: state.page + 1};

    case 'CREATE_A_TEAM_FIELD_EDIT':
      return R.pipe(
        R.assocPath(['fields', field, 'value'], value), // update field
        R.assocPath(['fields', field, 'error'], validationError(field, value)) // save any newly created error
      )(state);

    case 'CREATE_A_TEAM_FIELD_BLUR':
      return R.assocPath(['fields', field, 'pristine'], false)(state); // mark field as not pristine

    case 'CREATE_A_TEAM_UNMOUNT':
      return initialState;

    default:
      return state;
  }
}

export default createATeamReducer;
