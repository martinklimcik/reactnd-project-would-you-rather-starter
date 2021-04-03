import { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { setLoginRedirect } from "../actions/loginRedirect";
import Avatar from "./Avatar";
import PropTypes from "prop-types";
import "./Navigation.css";

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
    dispatch(setLoginRedirect("/"));
    dispatch(setAuthedUser(null));
  };

  render() {
    const { user, origin, dispatch } = this.props;

    if (user == null) {
      if (origin !== "/login") {
        dispatch(setLoginRedirect(origin));
      }
      return <Redirect to="/login" />;
    } else {
      return (
        <nav>
          <NavButton to="/">Home</NavButton>
          <NavButton to="/new">Create</NavButton>
          <NavButton to="/leaderboard">Leader Board</NavButton>
          {/* TODO: Separate navigation buttons from user info and logout button */}
          <div className="nav user">
            <Avatar src={user.avatarURL} />
            {user.name}
          </div>
          <button className="nav btn" onClick={this.handleLogout}>
            Logout
          </button>
        </nav>
      );
    }
  }
}

NavBar.propTypes = {
  user: PropTypes.object,
  origin: PropTypes.string,
};

function mapStateToProps({ users, authedUser }, props) {
  const origin = props.location.pathname;
  const user = authedUser != null ? users[authedUser] : null;
  return { user, origin };
}

export default connect(mapStateToProps)(NavBar);
