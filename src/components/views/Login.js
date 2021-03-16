import { Component } from "react";
import Dropdown from "../Dropdown";
import Button from "../Button";

const testusers = [
  { label: "Mates", value: "mates" },
  { label: "Tester", value: "tester" },
];

class Login extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Login</h1>
        </div>
        <form>
          <Dropdown options={testusers} />
          <Button text="Add new" />
          <Button text="Confirm" />
        </form>
      </div>
    );
  }
}

export default Login;
