import { Component } from "react";
import Button from "../Button";
import Input from "../Input";
import "./views.css";

class New extends Component {
  render() {
    return (
      <div className="view">
        <h1>Create New Poll</h1>
        <p className="wyr">Would You Rather</p>
        <form>
          <Input placeholder="First option" />
          <p className="wyr">OR</p>
          <Input placeholder="Second option" />
          <div>
            <Button text="Submit" cls="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default New;
