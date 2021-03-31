import { Component } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isPollAnswered, sortQuestions } from "../../utils/helpers";
import Avatar from "../Avatar";
import TabPanel from "../TabPanel";
import "./views.css";

// TODO: show when question was asked (parse from timestamp)
// TODO: empty list
const QuestionItem = (props) => {
  const users = useSelector((state) => state.users);
  const { author, optionOne, optionTwo, id } = props.item;

  return (
    <div className="list-item">
      <div>
        <Avatar src={users[author].avatarURL} />
        {users[author].name} asks
      </div>
      <div>
        <span className="wyr">Would You Rather</span>
        <p className="question">{optionOne.text}</p>
        <span>OR</span>
        <p className="question">{optionTwo.text}</p>
      </div>
      <Link to={`/question/${id}`}>
        <button className="button view-btn">View</button>
      </Link>
    </div>
  );
};

class QuestionList extends Component {
  render() {
    return (
      <div className="list">
        {this.props.items.map((item) => (
          <QuestionItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    const { questionList, authedUser } = this.props;

    return (
      <div className="view">
        <h1>Home View</h1>
        <TabPanel>
          <div label="Unanswered">
            <QuestionList
              items={questionList.filter(
                (poll) => !isPollAnswered(poll, authedUser)
              )}
            />
          </div>
          <div label="Answered">
            <QuestionList
              items={questionList.filter((poll) =>
                isPollAnswered(poll, authedUser)
              )}
            />
          </div>
        </TabPanel>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  // parse list of questions from object to array and sort by timestamp
  let questionList = sortQuestions(questions);
  return { questionList, authedUser };
}

export default connect(mapStateToProps)(Home);
