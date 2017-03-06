import React from 'react';
import { Link } from 'react-router';

class TakeInvite extends React.Component {
  constructor(props) {
    super(props);
    this.inviteId = props.params.id;
  }
  render() {
    return (
      <div className="home-page-container signin-page">
        <div className="home-page-title">{`Don't waste your day...`}</div>
        <div className="receive-invite-welcome-message">Welcome!! You were invited to join</div>
        <form>

          <div><input type="text" placeholder="First Name" name='lastName' value={''}/></div>
          <div><input type="text" placeholder="Last Name" name='firstName' value={''}/></div>
          <div><input type="text" placeholder="Username" name='username' value={''}/></div>
          <span className="at-sign">@</span>
          <div>New Team Domain</div>
          <div>&nbsp;</div>
          <input type="password" placeholder="Password" name='password' value={''}  />
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

export default TakeInvite;
