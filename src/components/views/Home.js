import "./views.css";
import { Component } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isPollAnswered, sortQuestions } from "../../utils/helpers";
import Avatar from "../Avatar";
import TabPanel from "../TabPanel";
import PropTypes from "prop-types";

// TODO: empty list - too long list
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
        <button className="button view-btn">{props.buttonText}</button>
      </Link>
    </div>
  );
};

QuestionItem.propTypes = {
  item: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
};

class QuestionList extends Component {
  render() {
    return (
      <div className="list">
        {this.props.items.map((item) => (
          <QuestionItem
            key={item.id}
            item={item}
            buttonText={this.props.buttonText}
          />
        ))}
      </div>
    );
  }
}

QuestionList.propTypes = {
  items: PropTypes.array.isRequired,
  buttonText: PropTypes.string.isRequired,
};

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
              buttonText="Vote"
            />
          </div>
          <div label="Answered">
            <QuestionList
              items={questionList.filter((poll) =>
                isPollAnswered(poll, authedUser)
              )}
              buttonText="View"
            />
          </div>
        </TabPanel>
      </div>
    );
  }
}

Home.propTypes = {
  questionList: PropTypes.array.isRequired,
  authedUser: PropTypes.string,
};

function mapStateToProps({ questions, authedUser }) {
  let questionList = sortQuestions(questions);
  return { questionList, authedUser };
}

export default connect(mapStateToProps)(Home);
