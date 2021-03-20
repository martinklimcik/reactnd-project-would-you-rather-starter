import "./views.css";
import { useLocation } from "react-router-dom";
import { questions, currentuser, users } from "./testdata";
import NotFound from "./NotFound";
import Button from "../Button";

// TODO: move to helper file
function isAnswered(poll, user) {
  return user.answers[poll.id] != null;
}
function getAnswer(poll, user) {
  return user.answers[poll.id];
}

const AnsweredQuestion = (props) => {
  const votesA = props.question.optionOne.votes.length;
  const votesB = props.question.optionTwo.votes.length;
  const totalVotes = votesA + votesB;
  const yourAnswer = getAnswer(props.question, currentuser);

  return (
    <div className="view">
      <h1>Question View</h1>
      <p>Author: {users[props.question.author].name}</p>
      <p>Avatar: TODO{/* TODO: Avatar */}</p>
      <p className="question">Option A: {props.question.optionOne.text}</p>
      <div>
        Answered {votesA} of {totalVotes} ({(votesA / totalVotes) * 100}%)
      </div>
      <div>This was {yourAnswer !== "optionOne" ? "NOT" : ""} your answer</div>
      <p className="question">Option B: {props.question.optionTwo.text}</p>
      <div>
        Answered {votesB} of {totalVotes} ({(votesB / totalVotes) * 100}%)
      </div>
      <div>This was {yourAnswer !== "optionTwo" ? "NOT" : ""} your answer</div>
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
      {users[props.question.author].id === currentuser.id ? (
        <p>
          You ({users[props.question.author].id /* TODO: Avatar instead of ID*/}
          ) have asked:
        </p>
      ) : (
        <p>
          {users[props.question.author].name} (
          {users[props.question.author].id /* TODO: Avatar instead of ID*/})
          asked:
        </p>
      )}
      <p className="wyr">Would You Rather</p>
      <div className="question">
        <Button text={props.question.optionOne.text} />
      </div>
      <p className="wyr">OR</p>
      <div className="question">
        <Button text={props.question.optionTwo.text} />
      </div>
      <div>
        <Button text="Submit" />
      </div>
    </div>
  );
};

const Poll = (props) => {
  const questionId = useLocation().pathname.replace("/question/", "");
  const question = questions[questionId];

  return question == null ? (
    <NotFound />
  ) : isAnswered(question, currentuser) ? (
    <AnsweredQuestion question={question} />
  ) : (
    <UnansweredQuestion question={question} />
  );
};

export default Poll;
