import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { handleAddQuestion } from "../../actions/questions";

class New extends Component {
  state = { optionOne: "", optionTwo: "", redirect: false };

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
    this.setState({ optionOne: "", optionTwo: "", redirect: true });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    const submitDisabled =
      this.state.optionOne === "" || this.state.optionTwo === "";
    return (
      <div className="view">
        <h1>Create New Poll</h1>
        <div className="list-item">
          <p className="question-label">Would You Rather</p>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="First option"
              className="input"
              onChange={this.handleOptionOne}
              value={this.state.optionOne}
            ></input>
            <p className="question-label">OR</p>
            <input
              placeholder="Second option"
              className="input"
              onChange={this.handleOptionTwo}
              value={this.state.optionTwo}
            ></input>
            <div>
              <button
                type="submit"
                className="submit"
                disabled={submitDisabled}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(New);
