//import "./views.css";
import { Component } from "react";

// TODO: some info if possible (e.g. question)
class NotFound extends Component {
  render() {
    return (
      <div className="view">
        <h1>Requested page was not found</h1>
      </div>
    );
  }
}

export default NotFound;
