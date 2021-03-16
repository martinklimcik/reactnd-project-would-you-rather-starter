import { Component } from "react";

class Input extends Component {
  render() {
    return <input placeholder={this.props.placeholder}></input>;
  }
}

export default Input;
