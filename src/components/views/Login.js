import { Component } from "react";
import Dropdown from "../Dropdown";
import Button from "../Button";
import "./views.css";

const testusers = [
  { label: "Mates", value: "mates" },
  { label: "Tester", value: "tester" },
];

class Login extends Component {
  render() {
    return (
      <div className="view">
        <h1>Login</h1>
        <form className="login-form">
          <Dropdown options={testusers} />
          <Button text="Add new" />
          <div>
            <Button text="Confirm" cls="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
