import R from 'ramda';
import emailValidate from 'email-validator';

export const validationRules = {
  email: [emailValidate.validate, 'Email appears to be invalid'],
  firstName: [R.test(/^.{1,30}$/), 'First name needs to be between 1 and 30 characters'],
  lastName: [R.test(/^.{0,30}$/), 'Last name need to be less than 30 characters'],
  username: [R.test(/^[0-9a-z]{1,20}$/i), 'Username must be alphanumeric, between 1 and 20 characters'],
  password: [R.test(/^.{6,100}$/), 'password must be between 6 and 100 characters'],
  teamName: [R.test(/^.{1,30}$/i), 'Team name must be between 1 and 30 characters'],
  teamdomain: [R.test(/^[0-9a-z]{1,20}$/i), 'Team domain must be alphanumeric, between 1 and 20 characters']
};
/** leaves and object of error messages, if all are valid, no messages */
export const validate = R.path(
  R.evolve(R.map(R.head, validationRules)), // check which are true
  R.pickBy(R.not), // keep the invalid records
  R.mapObjIndexed(R.prop(R.__, validationRules))
);

/** returns an error message if the field is invalid  */
export const validationError = (field, value) =>
  validationRules[field][0](value) ? '' : validationRules[field][1];
