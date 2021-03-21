import { Component } from "react";
import "./components.css";

const DEFAULT = "_default";

class Dropdown extends Component {
  render() {
    return (
      <select
        name="test"
        className="dropdown"
        onChange={this.props.onChange}
        defaultValue={DEFAULT}
      >
        <option key={DEFAULT} value={DEFAULT} disabled>
          --- Select User ---
        </option>
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
