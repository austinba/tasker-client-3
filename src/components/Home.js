import React from 'react';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ShowIf from './common/ShowIf';
import * as createATeamActions from '../actions/createATeam';
import GenericField from './common/GenericField';

class CreateATeamForm extends React.Component {
  constructor(props) {
    super(props);
    const { editField, blurField } = props.actions;
    this.Field = GenericField(editField, blurField);
  }
  componentWillUnmount() {
    this.props.actions.unmount();
  }
  render() {
    const { nextPage, submit } = this.props.actions;
    const Field = this.Field;
    const { fields, error } = this.props;
    const { pendingTeamLookup, teamAvailable } = this.props.createATeam;
    const fieldsValid = R.pipe(
      R.props(R.__, fields),
      R.pluck('error'),
      R.reject(R.isEmpty),
      R.length,
      R.equals(0)
    );

    const submitAction = submit.bind(null, fields);

    return (
      <form className="create-a-team-form">
        {error}
        <ShowIf show={this.props.page === 1}>
          <Field name="email"
                 placeholder="Email address"
                 className="create-a-team-email"
                 fields={fields}
                 autoFocus/>
          <button
            onClick={nextPage}
            disabled={!fieldsValid(['email'])}
            className="create-a-team-email-submit create-a-team-button" >
            Create a Team
          </button>

        </ShowIf>
        <ShowIf show={this.props.page === 2}>
          <Field name="firstName"  placeholder="First Name"  fields={fields} autoFocus/>
          <Field name="lastName"   placeholder="Last Name"   fields={fields}/>
          <Field name="username"   placeholder="Username"    fields={fields}/>
          <button onClick={nextPage}
            disabled={!fieldsValid(['firstName', 'lastName', 'username'])}
            className="create-a-team-email-submit">
            Continue to Password
          </button>

        </ShowIf>
        <ShowIf show={this.props.page === 3}>
          <Field name="password"   placeholder="Password" type="password" fields={fields} autoFocus/>
          <button
            onClick={nextPage}
            disabled={!fieldsValid(['password'])}
            className="create-a-team-email-submit" >
            Continue to Team Name
          </button>

        </ShowIf>
        <ShowIf show={this.props.page === 4}>
          <Field name="teamName"   placeholder="Team Name"   fields={fields} autoFocus/>
          <button onClick={nextPage}
            disabled={!fieldsValid(['teamName'])}
            className="create-a-team-email-submit" >
            Continue to Team Domain
          </button>
          {teamAvailable && 'Team is avaiable!!'}
        </ShowIf>
        <ShowIf show={this.props.page === 5}>
          <Field name="teamdomain" placeholder="Team Domain" fields={fields} autoFocus/>
          <div className="create-a-team-domain-suffix">.quarterstretch.com</div>
          <span>{(!pendingTeamLookup && !fields.teamdomain.error) && (teamAvailable ? `${fields.teamdomain.value} is available` : `${fields.teamdomain.value} is taken`)}</span>
          <button onClick={submitAction}
            disabled={!fieldsValid(['teamdomain']) || !teamAvailable || pendingTeamLookup}
            className="create-a-team-email-submit">
            Create Team
          </button>

        </ShowIf>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  page: state.createATeam.page,
  fields: state.createATeam.fields,
  error: state.createATeam.error,
  createATeam: state.createATeam
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(createATeamActions, dispatch)
});
CreateATeamForm = connect(mapStateToProps, mapDispatchToProps)(CreateATeamForm);


class Home extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <div className="home-page-title">{`Don't waste your day...`}</div>
        <CreateATeamForm />
        <div className="home-page-sign-in-line">
          Your team already uses Quarterstretch? <Link to="/sign-in"><em>Sign in</em></Link>
        </div>
        <div className="home-page-product-name">welcome to Quarterstretch</div>
      </div>
      );
    }
  }

export default Home;
