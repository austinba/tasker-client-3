import R from 'ramda';
import React from 'react';
import { fullName } from '../../utilities';

class UsersDropDown extends React.Component {

  componentWillMount() {
    const recentUsers   = R.defaultTo([])(this.props.recentUsers);
    this.allUsers       = R.defaultTo({})(this.props.allUsers);
    const recentUserIDs = R.map(s => s.toString())(recentUsers);
    const allUserIDs    = R.keys(this.allUsers);
    const currentUserID = this.props.currentUserID.toString();

    this.userPickList  =
    R.reject(R.equals(currentUserID))(
      R.union(recentUserIDs, allUserIDs)
    );
    if(!this.props.value) {
      const initialValue = this.userPickList[0] || ' ';
      this.props.onChange({ target: { value: initialValue } });
    }
  }
  render() {

    const userSelection = R.pipe(
      R.map(userID =>
        <option value={userID} key={userID}>
        {fullName(this.allUsers)(userID)}
        </option>
      ),
      result =>
        <select
          className="task-edit"
          onChange={this.props.onChange}
          value={this.props.value}>{result}</select>
      )(this.userPickList)

    return userSelection;

  }
}

export default UsersDropDown;