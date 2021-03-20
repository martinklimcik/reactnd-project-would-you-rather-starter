import { Component } from "react";
import TabPanel from "../TabPanel";
import { questions, currentuser, users } from "./testdata";
import "./views.css";

// TODO: show when question was asked (parse from timestamp)
const PollItem = (props) => {
  return (
    <div className="list-item">
      <div>{users[props.item.author].name} asks</div>
      <div>
        <span className="wyr">Would You Rather</span>
        <p className="question">{props.item.optionOne.text}</p>
        <span>OR</span>
        <p className="question">{props.item.optionTwo.text}</p>
      </div>
      <button className="button view-btn">View</button>
    </div>
  );
};

class PollList extends Component {
  render() {
    return (
      <div className="list">
        {this.props.items.map((item) => (
          <PollItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

// TODO: move to helper file
function isAnswered(poll, user) {
  return user.answers[poll.id] != null;
}

class Home extends Component {
  render() {
    // TODO: !!! prevod objektu na pole a sortovanie podla casu
    let items = [];
    for (const item in questions) {
      items.push(questions[item]);
    }
    items.sort((a, b) => a.timestamp - b.timestamp);

    return (
      <div className="view">
        <h1>Home View</h1>
        <TabPanel>
          <div label="Unanswered">
            <PollList
              items={items.filter((poll) => !isAnswered(poll, currentuser))}
            />
          </div>
          <div label="Answered">
            <PollList
              items={items.filter((poll) => isAnswered(poll, currentuser))}
            />
          </div>
        </TabPanel>
      </div>
    );
  }
}

export default Home;
