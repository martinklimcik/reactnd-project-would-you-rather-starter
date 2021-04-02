import { Component } from "react";
import Dropdown from "../Dropdown";
import "./views.css";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import { Redirect, withRouter } from "react-router";
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
            {/* TODO: disabled visual */}
            <button
              className="button submit"
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
  users: PropTypes.array.isRequired,
};

function mapStateToProps({ users, loginRedirect }) {
  let userList = [];
  for (const userId in users) {
    userList.push({ label: users[userId].name, value: users[userId].id });
  }
  return { users: userList, loginRedirect };
}

export default withRouter(connect(mapStateToProps)(Login));
