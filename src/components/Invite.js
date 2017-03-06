import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as inviteActions from '../actions/invite';

class Invite extends React.Component {
  componentWillUnmount() {
    this.actions.unmount();
  }
  render() {
    const {email, error, pending, validationError} = this.props.invite;
    const {editEmail, submit, successful} = this.props.actions;
    if(successful) {
      return
        <div className="invite-box create-a-team-form">
          We just sent an email inviting {email} to your team!
        </div>;
    }
    const submitAction = submit.bind(null, {email});
    return (
      <form className="invite-box create-a-team-form">
        Invite someone to join your team :-D
        <input type="email" placeholder="Email Address" value={email || ''} onChange={editEmail} />
        <button onClick={submitAction} disabled={validationError||pending}>Invite!</button>
        {error && (<span><br /><br />{error}</span>)}
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  invite: state.invitePage
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(inviteActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Invite);
