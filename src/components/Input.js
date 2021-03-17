import { Component } from "react";
import "./components.css";

class Input extends Component {
  render() {
    return <input placeholder={this.props.placeholder}></input>;
  }
}

export default Input;
