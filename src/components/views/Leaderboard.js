import { Component } from "react";
import TabPanel from "../TabPanel";
import "./views.css";
import { connect } from "react-redux";

const UserItem = (props) => {
  // TODO: add Avatar
  // TODO: show answered/created x questions of y total (%)
  // TODO: pagination
  // TODO: highlight of currently logged in user
  return (
    <div className="list-item user-item">
      <div className="user-item-name">{props.user.name}</div>
      <div className="user-item-data">
        <div>Answered questions: {props.user.answers}</div>
        <div>Created questions: {props.user.questions}</div>
      </div>
    </div>
  );
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

function mapStateToProps({ users }) {
  let listByAnswers = [];
  let listByQuestions = [];
  for (const item in users) {
    const _user = users[item];
    const new_user = {
      id: _user.id,
      name: _user.name,
      answers: Object.keys(_user.answers).length,
      questions: _user.questions.length,
    };
    listByAnswers.push(new_user);
    listByQuestions.push(new_user);
  }
  listByAnswers.sort((a, b) => b.answers - a.answers);
  listByQuestions.sort((a, b) => b.questions - a.questions);

  return { listByAnswers, listByQuestions };
}

export default connect(mapStateToProps)(LeaderBoard);
