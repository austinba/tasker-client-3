import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import ShowIf from './common/ShowIf';
import * as createATeamActions from '../actions/createATeam';

const formName = 'createATeamEmail';
const get = formValueSelector(formName);
class CreateATeamForm extends React.Component {
  render() {
    return (
      <form onSubmit="" className="create-a-team-form">
        <Field name="page"
               component="input"
               type="hidden"
        />
        <ShowIf show={!this.props.page}>
          <Field name="email"
                 component="input"
                 placeholder="Email address"
                 type="text"
          />
          <button onClick={this.props.actions.goToPage.bind(2)}
                  className="create-a-team-email-submit"
            >
            Create a Team
          </button>
        </ShowIf>
        <ShowIf show={this.props.page === 2}>
          <Field name="firstName"
                 component="input"
                 placeholder="First Name"
                 type="text"
          />
          <Field name="lastName"
                 component="input"
                 placeholder="Last Name"
                 type="text"
          />
          <Field name="username"
                 component="input"
                 placeholder="Username"
                 type="text"
          />
          <button onClick={this.props.actions.goToPage.bind(3)}
                  className="create-a-team-email-submit"
            >
            Continue to Password
          </button>
        </ShowIf>
        <ShowIf show={this.props.page === 3}>
          <Field name="password"
                 component="input"
                 placeholder="Password"
                 type="password"
          />

          <button onClick={this.props.actions.goToPage.bind(4)}
                  className="create-a-team-email-submit"
            >
            Continue to Team Name
          </button>
        </ShowIf>
        <ShowIf show={this.props.page === 4}>
          <Field name="teamName"
                 component="input"
                 placeholder="Team Name"
                 type="text"
          />
          <button onClick={this.props.actions.goToPage.bind(5)}
                  className="create-a-team-email-submit"
            >
            Continue to Team Domain
          </button>
        </ShowIf>
        <ShowIf show={this.props.page === 5}>
          <Field name="teamDomain"
                 component="input"
                 placeholder="Team Domain"
                 type="text"
          />
          <div className="create-a-team-domain-suffix">.quarterstretch.com</div>
          <button onClick=""
                  className="create-a-team-email-submit"
            >
            Create Team
          </button>
        </ShowIf>
      </form>
    );
  }
}
CreateATeamForm = reduxForm({
  form: formName,
  forceUnregisterOnUnmount: false
})(CreateATeamForm);

CreateATeamForm = connect(
  state => ({
    page: state.createATeam.page,
  }),
  dispatch => ({
    actions: bindActionCreators(createATeamActions, dispatch)
  })
  )(CreateATeamForm);


class Home extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <div className="home-page-title">{`Don't waste your day...`}</div>
        <CreateATeamForm />
        <div className="home-page-sign-in-line">
          Your team already uses Quarterstretch? <Link><em>Sign in</em></Link>
        </div>
        <div className="home-page-product-name">welcome to Quarterstretch</div>
      </div>
      );
    }
  }

export default Home;
