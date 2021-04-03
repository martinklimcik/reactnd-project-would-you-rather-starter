import "./Leaderboard.css";
import { Component } from "react";
import { connect } from "react-redux";
import TabPanel from "../TabPanel";
import Avatar from "../Avatar";
import PropTypes from "prop-types";

const UserItem = (props) => {
  let cls = "list-item user-item";
  cls += props.user.current ? " current-user" : "";
  return (
    <div className={cls}>
      <div className="user-item-rank">{props.rank}</div>
      <div className="user-item-name">
        <Avatar src={props.user.avatarURL} />
        {props.user.name}
      </div>
      <div className="user-item-data">
        <div>Answered: {props.user.answers}</div>
        <div>Created: {props.user.questions}</div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  rank: PropTypes.number,
};

const UserList = (props) => {
  return (
    <div className="list">
      {props.users.map((user, index) => (
        <UserItem key={user.id} user={user} rank={index + 1} />
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

class LeaderBoard extends Component {
  render() {
    return (
      <div className="view">
        <h1>LeaderBoard</h1>

        <TabPanel>
          <div label="By Answered Questions">
            <UserList users={this.props.listByAnswers} />
          </div>
          <div label="By Created Questions">
            <UserList users={this.props.listByQuestions} />
          </div>
        </TabPanel>
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  listByAnswers: PropTypes.array.isRequired,
  listByQuestions: PropTypes.array.isRequired,
};

function mapStateToProps({ users, authedUser }) {
  // Create separate list for each order (by number of questions and number of answers)
  // Then sort them accordingly
  let listByAnswers = [];
  let listByQuestions = [];
  for (const item in users) {
    const _user = users[item];
    const new_user = {
      id: _user.id,
      name: _user.name,
      answers: Object.keys(_user.answers).length,
      questions: _user.questions.length,
      avatarURL: _user.avatarURL,
      current: _user.id === users[authedUser].id,
    };
    listByAnswers.push(new_user);
    listByQuestions.push(new_user);
  }
  listByAnswers.sort((a, b) => b.answers - a.answers);
  listByQuestions.sort((a, b) => b.questions - a.questions);

  return { listByAnswers, listByQuestions };
}

export default connect(mapStateToProps)(LeaderBoard);
