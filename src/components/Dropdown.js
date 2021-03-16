import { Component } from "react";

class Dropdown extends Component {
  render() {
    return (
      <select name="test" classname="dropdown">
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
