import R from 'ramda';
import React from 'react';
import { fullName } from '../../utilities';

const UsersDropDown = (props) => {
  const recentUsers   = R.defaultTo([])(props.recentUsers);
  const allUsers      = R.defaultTo({})(props.allUsers);
  const recentUserIDs = R.map(s => s.toString())(recentUsers);
  const allUserIDs    = R.keys(allUsers);

  const currentUserID = props.currentUserID.toString();

  const userPickList  =
  R.reject(R.equals(currentUserID))(
    R.union(recentUserIDs, allUserIDs)
  );

  const userSelection = R.pipe(
    R.map(userID =>
      <option value={userID} key={userID}>
      {fullName(allUsers)(userID)}
      </option>
    ),
    result => <select className="task-edit">{result}</select>
  )(userPickList)

  return userSelection;
}

export default UsersDropDown;
