import * as api from '../api';
import R from 'ramda';

export const handleUpdate = (event) => {
  const {name, value} = event.target;
  return {type: 'SIGN_IN_PAGE_UPDATE_FIELD', name , value: value };
};
