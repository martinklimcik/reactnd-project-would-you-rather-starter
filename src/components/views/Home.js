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

const PaginationButtons = (props) => {
  return (
    <div>
      {props.pageNumbers.map((page) => (
        <button key={page} onClick={() => props.changePage(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

PaginationButtons.propTypes = {
  pageNumbers: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
};

class QuestionList extends Component {
  state = { currentPage: 1 };

  changePage = (toPage) => {
    this.setState({ currentPage: toPage });
  };

  render() {
    const itemsPerPage = 10;
    const lastIndex = this.state.currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentList = this.props.items.slice(firstIndex, lastIndex);

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.items.length / itemsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div className="list">
        <PaginationButtons
          pageNumbers={pageNumbers}
          changePage={this.changePage}
        />
        {currentList.length == 0 ? (
          <p>{this.props.emptyMessage}</p>
        ) : (
          currentList.map((item) => (
            <QuestionItem
              key={item.id}
              item={item}
              buttonText={this.props.buttonText}
            />
          ))
        )}
        <PaginationButtons
          pageNumbers={pageNumbers}
          changePage={this.changePage}
        />
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
              emptyMessage="You have answered all questions!"
            />
          </div>
          <div label="Answered">
            <QuestionList
              items={questionList.filter((poll) =>
                isPollAnswered(poll, authedUser)
              )}
              buttonText="View"
              emptyMessage="You haven't answered any question yet!"
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
