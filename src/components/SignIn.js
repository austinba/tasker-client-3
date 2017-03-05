import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as signInPageActions from '../actions/signInPage';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {username, teamdomain, password} = this.props.signInProps;
    const {handleUpdate} = this.props.actions;
    return (
      <div className="home-page-container signin-page">
        <div className="home-page-title">{`Don't waste your day...`}</div>
        <form>
          <input type="text" placeholder="Username" name='username' value={username || ''} onChange={handleUpdate} />
          <span className="at-sign">@</span>
          <input type="text" placeholder="Team" name='teamdomain' value={teamdomain || ''} onChange={handleUpdate} />
          <div>&nbsp;</div>
          <input type="password" placeholder="Password" name='password' value={password || ''} onChange={handleUpdate} />
          <button type="submit">submit</button>
        </form>
        <div className="home-page-sign-in-line">
          Need to create a team? <Link to="/"><em>Create a Team</em></Link>
        </div>
        <div className="home-page-product-name">welcome to Quarterstretch</div>
      </div>
      );
    }
  }

const mapStateToProps = (state) => ({
  signInProps: state.signInPage
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(signInPageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
