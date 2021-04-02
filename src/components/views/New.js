import "./views.css";
import { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../actions/questions";

class New extends Component {
  state = { optionOne: "", optionTwo: "", confirmation: false };

  handleOptionOne = (e) => {
    this.setState({ optionOne: e.target.value });
  };
  handleOptionTwo = (e) => {
    this.setState({ optionTwo: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.setState({ optionOne: "", optionTwo: "", confirmation: true });
  };

  // TODO: submit button disabled css
  // TODO: state.confirmation to show confirmation of question successfully added and button to go to voting screen for it
  render() {
    const submitDisabled =
      this.state.optionOne === "" && this.state.optionTwo === "";
    return (
      <div className="view">
        <h1>Create New Poll</h1>
        <p className="wyr">Would You Rather</p>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="First option"
            className="input"
            onChange={this.handleOptionOne}
          ></input>
          <p className="wyr">OR</p>
          <input
            placeholder="Second option"
            className="input"
            onChange={this.handleOptionTwo}
          ></input>
          <div>
            <button type="submit" className="submit" disabled={submitDisabled}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(New);
