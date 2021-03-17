import { Component } from "react";
import TabPanel from "../TabPanel";
import { questions, currentuser } from "./testdata";

// TODO: show when question was asked (parse from timestamp)
const PollItem = (props) => {
  return (
    <div>
      <div>{props.item.author} asks</div>
      <div>
        WYR: {props.item.optionOne.text} OR {props.item.optionTwo.text}
      </div>
      <button>View</button>
    </div>
  );
};

class PollList extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <PollItem key={item.id} item={item} />
        ))}
      </ul>
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
          <div label="Answered">
            <PollList
              items={items.filter((poll) => isAnswered(poll, currentuser))}
            />
          </div>
          <div label="Unanswered">
            <PollList
              items={items.filter((poll) => !isAnswered(poll, currentuser))}
            />
          </div>
        </TabPanel>
      </div>
    );
  }
}

export default Home;
