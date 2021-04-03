import "./Poll.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleAnswerQuestion } from "../../actions/questions";
import { isPollAnswered, sortQuestions } from "../../utils/helpers";
import NotFound from "./NotFound";
import Avatar from "../Avatar";
import PropTypes from "prop-types";

const AnsweredQuestion = (props) => {
  const votesA = props.question.optionOne.votes.length;
  const votesB = props.question.optionTwo.votes.length;
  const totalVotes = votesA + votesB;
  return (
    <div className="view">
      <h1>Answered question</h1>
      <div className="list-item">
        <p className="user-info">
          Created by {props.author.name} <Avatar src={props.author.avatarURL} />
        </p>
        <div className="question-label">Would You Rather</div>
        <table className="question-row">
          <tr>
            <td
              className={`question-data${
                props.answer === "optionOne" ? " user-answer" : ""
              }`}
            >
              <p className="question">{props.question.optionOne.text}</p>
              <div>
                {votesA} users chose this answer (
                {Math.round((votesA / totalVotes) * 100)}%)
              </div>
            </td>
            <td
              className={`question-data${
                props.answer === "optionTwo" ? " user-answer" : ""
              }`}
            >
              <p className="question">{props.question.optionTwo.text}</p>
              <div>
                {votesB} users chose this answer (
                {Math.round((votesB / totalVotes) * 100)}%)
              </div>
            </td>
          </tr>
        </table>
        <div className="next-question">
          {props.nextQuestionId == null ? (
            <button disabled className="view">
              You have answered all available questions!
            </button>
          ) : (
            <Link to={`/question/${props.nextQuestionId}`}>
              <button className="view">Answer another question</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

AnsweredQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  answer: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  nextQuestionId: PropTypes.string.isRequired,
};

const UnansweredQuestion = (props) => {
  function handleAnswer(answer) {
    const { dispatch } = props;
    dispatch(handleAnswerQuestion(props.question.id, answer));
  }

  return (
    <div className="view">
      <h1>Answer Question</h1>
      <div className="list-item">
        <p className="user-info">
          <Avatar src={props.author.avatarURL} /> {props.author.name} asked:
        </p>
        <p className="question-label">Would You Rather</p>
        <div className="question">
          <button
            className="view vote"
            onClick={() => handleAnswer("optionOne")}
          >
            {props.question.optionOne.text}
          </button>
        </div>
        <p className="question-label">OR</p>
        <div className="question">
          <button
            className="view vote"
            onClick={() => handleAnswer("optionTwo")}
          >
            {props.question.optionTwo.text}
          </button>
        </div>
      </div>
    </div>
  );
};

UnansweredQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const Poll = (props) => {
  return props.question == null ? (
    <NotFound />
  ) : props.answer != null ? (
    <AnsweredQuestion
      question={props.question}
      author={props.author}
      answer={props.answer}
      dispatch={props.dispatch}
      nextQuestionId={props.nextQuestionId}
    />
  ) : (
    <UnansweredQuestion
      question={props.question}
      author={props.author}
      dispatch={props.dispatch}
    />
  );
};

Poll.propTypes = {
  question: PropTypes.object.isRequired,
  author: PropTypes.object,
  answer: PropTypes.string,
  nextQuestionId: PropTypes.string,
};

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;

  const question = questions[id];
  const answer = authedUser == null ? null : users[authedUser].answers[id];
  const author = question == null ? null : users[question.author];
  const nextQuestion = sortQuestions(questions).find(
    (poll) => !isPollAnswered(poll, authedUser)
  );
  const nextQuestionId = nextQuestion != null ? nextQuestion.id : null;
  return { question, author, answer, nextQuestionId };
}

export default connect(mapStateToProps)(Poll);
