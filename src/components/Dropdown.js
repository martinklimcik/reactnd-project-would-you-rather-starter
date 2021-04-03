import "./DropDown.css";
import { Component } from "react";
import PropTypes from "prop-types";

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

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default Dropdown;
