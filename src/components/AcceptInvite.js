import React from 'react';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ShowIf from './common/ShowIf';
import * as acceptInviteActions from '../actions/acceptInvite';
import GenericField from './common/GenericField';

class AcceptInviteForm extends React.Component {
  constructor(props) {
    super(props);
    const { editField, blurField } = props.actions;
    this.Field = GenericField(editField, blurField);
    props.actions.getInviteInfo({inviteID: props.inviteID});

  }
  componentWillUnmount() {
    this.props.actions.unmount();
  }
  render() {
    const { nextPage, submit } = this.props.actions;
    const Field = this.Field;
    const { fields, error, inviteID } = this.props;
    const { pendingUserLookup, usernameAvailable, inviteInfo } = this.props.acceptInvite;
    console.log({pendingUserLookup, usernameAvailable})
    const fieldsValid = R.pipe(
      R.props(R.__, fields),
      R.pluck('error'),
      R.reject(R.isEmpty),
      R.length,
      R.equals(0)
    );
    const submitAction = submit.bind(null, R.pipe(
      R.pluck('value'),
      R.assoc('inviteID', inviteID)
    )(fields));

    return (
      <form className="create-a-team-form">
        <div className="receive-invite-welcome-message">
          Welcome!! You were invited
          {inviteInfo && inviteInfo.teamdomain ? ` to join ${inviteInfo.teamdomain}!` : '!'}
        </div>
        {error}

        <ShowIf show={this.props.page === 1}>
          <Field name="firstName"  placeholder="First Name"  fields={fields} autoFocus/>
          <Field name="lastName"   placeholder="Last Name"   fields={fields}/>
          <button onClick={nextPage}
            disabled={!fieldsValid(['firstName', 'lastName'])}
            className="create-a-team-email-submit">
            Add Sign in Info
          </button>

        </ShowIf>
        <ShowIf show={this.props.page === 2}>
          <Field name="username"   placeholder="Username" fields={fields} autoFocus/>
          <Field name="password"   placeholder="Password" type="password" fields={fields} />
          <button
            onClick={submitAction}
            disabled={!fieldsValid(['username', 'password'] || !usernameAvailable || pendingUserLookup)}
            className="create-a-team-email-submit" >
            CreateUser
          </button>
          {usernameAvailable && !pendingUserLookup && 'Username is available!!'}
          {!usernameAvailable && !pendingUserLookup && 'Username is already taken'}
        </ShowIf>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  page: state.acceptInvite.page,
  fields: state.acceptInvite.fields,
  error: state.acceptInvite.error,
  acceptInvite: state.acceptInvite
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(acceptInviteActions, dispatch)
});
AcceptInviteForm = connect(mapStateToProps, mapDispatchToProps)(AcceptInviteForm);


class Home extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <div className="home-page-title">{`Don't waste your day...`}</div>
        <AcceptInviteForm inviteID={this.props.params.id} />
        <div className="home-page-sign-in-line">
          Your team already uses Quarterstretch? <Link to="/signin"><em>Sign in</em></Link>
        </div>
        <div className="home-page-product-name">welcome to Quarterstretch</div>
      </div>
      );
    }
  }

export default Home;
