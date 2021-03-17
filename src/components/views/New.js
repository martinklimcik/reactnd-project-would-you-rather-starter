import { Component } from "react";
import Button from "../Button";
import Input from "../Input";
import "./views.css";

class New extends Component {
  render() {
    return (
      <div>
        <h1>Create New Poll</h1>
        <p>Would You Rather</p>
        <form>
          <Input placeholder="Answer A" />
          <p>OR</p>
          <Input placeholder="Answer B" />
          <div>
            <Button text="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default New;
