import { Component } from "react";
import "./components.css";

class Button extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick} className="button">
        {this.props.text}
      </button>
    );
  }
}

export default Button;
