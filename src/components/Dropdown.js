import { Component } from "react";
import "./components.css";

class Dropdown extends Component {
  render() {
    return (
      <select name="test" className="dropdown">
        {this.props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}

export default Dropdown;
