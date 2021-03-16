import { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <NavLink to="/" className="nav-button">
          Home
        </NavLink>
        <NavLink to="/new" className="nav-button">
          Create
        </NavLink>
        <NavLink to="/leaderboard" className="nav-button">
          Leader Board
        </NavLink>
        Logged in user
        <NavLink to="/login" className="nav-button">
          Logout
        </NavLink>
      </div>
    );
  }
}

export default NavBar;
