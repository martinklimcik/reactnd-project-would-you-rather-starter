import { Component } from "react";
import Dropdown from "../Dropdown";
import Button from "../Button";
import "./views.css";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import { Redirect, withRouter } from "react-router";

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
      <Redirect to="/" />
    ) : (
      <div className="view">
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <Dropdown
            options={this.props.users}
            onChange={this.handleSelection}
          />
          <Button text="Add new" /> {/* TODO: create new user functionality */}
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

function mapStateToProps({ users }) {
  let userList = [];
  for (const userId in users) {
    userList.push({ label: users[userId].name, value: users[userId].id });
  }
  return { users: userList };
}

export default withRouter(connect(mapStateToProps)(Login));
