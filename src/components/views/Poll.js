import "./views.css";
import NotFound from "./NotFound";
import Button from "../Button";
import { connect } from "react-redux";

const AnsweredQuestion = (props) => {
  const votesA = props.question.optionOne.votes.length;
  const votesB = props.question.optionTwo.votes.length;
  const totalVotes = votesA + votesB;

  return (
    <div className="view">
      <h1>Question View</h1>
      <p>Author: {props.author.name}</p>
      <p>Avatar: TODO{/* TODO: Avatar */}</p>
      <p className="question">Option A: {props.question.optionOne.text}</p>
      <div>
        Answered {votesA} of {totalVotes} ({(votesA / totalVotes) * 100}%)
      </div>
      <div>
        This was {props.answer !== "optionOne" ? "NOT" : ""} your answer
      </div>
      <p className="question">Option B: {props.question.optionTwo.text}</p>
      <div>
        Answered {votesB} of {totalVotes} ({(votesB / totalVotes) * 100}%)
      </div>
      <div>
        This was {props.answer !== "optionTwo" ? "NOT" : ""} your answer
      </div>
      <div>
        <Button text="Answer another question" />
      </div>
    </div>
  );
};

const UnansweredQuestion = (props) => {
  return (
    <div className="view">
      <h1>Question View</h1>
      {
        /*props.author.id === currentuser.id ? (
        <p>
          You ({props.author.id}
          ) have asked:
        </p>
      ) : */ <p>
          {props.author.name} ({props.author.id /* TODO: Avatar instead of ID*/}
          ) asked:
        </p>
      }
      <p className="wyr">Would You Rather</p>
      <form>
        <div className="question">
          <Button text={props.question.optionOne.text} />
        </div>
        <p className="wyr">OR</p>
        <div className="question">
          <Button text={props.question.optionTwo.text} />
        </div>
        <div>
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const Poll = (props) => {
  return props.question == null ? (
    <NotFound />
  ) : props.answer != null ? (
    <AnsweredQuestion
      question={props.question}
      author={props.author}
      answer={props.answer}
    />
  ) : (
    <UnansweredQuestion question={props.question} author={props.author} />
  );
};

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;

  const question = questions[id];
  const answer = authedUser == null ? null : users[authedUser].answers[id];
  const author = question == null ? null : users[question.author];

  return { question, author, answer };
}

export default connect(mapStateToProps)(Poll);
