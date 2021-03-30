import "./views.css";
import NotFound from "./NotFound";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../../actions/questions";
import { isPollAnswered, sortQuestions } from "../../utils/helpers";
import { Link } from "react-router-dom";

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
        {props.nextQuestionId == null ? (
          <p>All questions Answered!</p>
        ) : (
          <Link to={`/question/${props.nextQuestionId}`}>
            <button className="button">Answer another question</button>
          </Link>
        )}
      </div>
    </div>
  );
};

const UnansweredQuestion = (props) => {
  function handleAnswer(answer) {
    const { dispatch } = props;
    dispatch(handleAnswerQuestion(props.question.id, answer));
  }

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
      <div className="question">
        <button className="button" onClick={() => handleAnswer("optionOne")}>
          {props.question.optionOne.text}
        </button>
      </div>
      <p className="wyr">OR</p>
      <div className="question">
        <button className="button" onClick={() => handleAnswer("optionTwo")}>
          {props.question.optionTwo.text}
        </button>
      </div>
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
