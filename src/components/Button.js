import { Component } from "react";
import "./components.css";

class Button extends Component {
  render() {
    let cls = "button";
    if (this.props.cls) cls += " " + this.props.cls;
    return (
      <button type="button" onClick={this.props.onClick} className={cls}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
