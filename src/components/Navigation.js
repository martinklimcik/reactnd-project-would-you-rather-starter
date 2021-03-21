import { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import "./components.css";

const NavButton = (props) => {
  return (
    <NavLink exact to={props.to} className="nav btn" activeClassName="active">
      {props.children}
    </NavLink>
  );
};

class NavBar extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };

  render() {
    const { authedUserName } = this.props;
    return (
      <nav>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/new">Create</NavButton>
        <NavButton to="/leaderboard">Leader Board</NavButton>
        {/* <NavButton to="/question/8xf0y6ziyjabvozdd253nd">
          Question
        </NavButton> */}
        {/* TODO: delete*/}
        {/* TODO: Separate navigation buttons from user info and logout button */}
        <div className="nav user">Logged in: {authedUserName}</div>
        <button className="nav btn" onClick={this.handleLogout}>
          Logout
        </button>
      </nav>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const authedUserName = users[authedUser].name;
  return { authedUserName };
}

export default connect(mapStateToProps)(NavBar);
