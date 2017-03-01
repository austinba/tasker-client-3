import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';

const CreateATeamForm = reduxForm({form: 'createATeamEmail'})(
  props => (
    <form onSubmit="">
      <Field name="email"
             component="input"
             placeholder="Email address"
             className="create-a-team-email"
             type="email"
        />
      <button type="submit"
              className="create-a-team-email-submit"
              disabled={props.submitting}
        >
        Create a Team
      </button>

    </form>
));

class Home extends React.Component {
  render() {
    return (
      <div className="home-page-container">
        <div className="home-page-title">Don't waste your day...</div>
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
