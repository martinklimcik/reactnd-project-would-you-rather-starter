import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./components.css";

const isLoggedIn = true;

const NavButton = (props) => {
  return (
    <NavLink exact to={props.to} className="nav btn" activeClassName="active">
      {props.children}
    </NavLink>
  );
};

class NavBar extends Component {
  render() {
    return isLoggedIn ? (
      <nav>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/new">Create</NavButton>
        <NavButton to="/leaderboard">Leader Board</NavButton>
        <div className="nav">Logged in user</div>
        <NavButton to="/login">Logout</NavButton>
      </nav>
    ) : null;
  }
}

export default NavBar;
