import "./Login.css";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { setAuthedUser } from "../../actions/authedUser";
import Dropdown from "../Dropdown";
import PropTypes from "prop-types";

class Login extends Component {
  state = { selectedUser: null, loggedIn: false };

  handleSelection = (e) => {
    this.setState({ selectedUser: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedUser } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(selectedUser));
    this.setState({ loggedIn: true });
  };

  render() {
    return this.state.loggedIn ? (
      <Redirect to={this.props.loginRedirect} />
    ) : (
      <div className="view">
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <Dropdown
            options={this.props.users}
            onChange={this.handleSelection}
          />
          <div>
            <button
              className="submit"
              type="submit"
              disabled={this.state.selectedUser == null}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  users: PropTypes.array,
};

function mapStateToProps({ users, loginRedirect }) {
  let userList = [];
  for (const userId in users) {
    const _user = users[userId];
    userList.push({ label: _user.name, value: _user.id, img: _user.avatarURL });
  }
  return { users: userList, loginRedirect };
}

export default withRouter(connect(mapStateToProps)(Login));
