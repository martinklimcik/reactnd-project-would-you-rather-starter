import { Component } from "react";
import TabPanel from "../TabPanel";
import "./views.css";
import { connect } from "react-redux";
import Avatar from "../Avatar";
import PropTypes from "prop-types";

const UserItem = (props) => {
  // TODO: show answered/created x questions of y total (%)
  // TODO: pagination
  // TODO: highlight of currently logged in user
  return (
    <div className="list-item user-item">
      <div className="user-item-name">
        <Avatar src={props.user.avatarURL} />
        {props.user.name}
      </div>
      <div className="user-item-data">
        <div>Answered questions: {props.user.answers}</div>
        <div>Created questions: {props.user.questions}</div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

const UserList = (props) => {
  return (
    <div className="list">
      {props.users.map((user) => (
        <UserItem key={user.id} user={user} />
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
        <h1>LeaderBoard View</h1>
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

function mapStateToProps({ users }) {
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
    };
    listByAnswers.push(new_user);
    listByQuestions.push(new_user);
  }
  listByAnswers.sort((a, b) => b.answers - a.answers);
  listByQuestions.sort((a, b) => b.questions - a.questions);

  return { listByAnswers, listByQuestions };
}

export default connect(mapStateToProps)(LeaderBoard);
