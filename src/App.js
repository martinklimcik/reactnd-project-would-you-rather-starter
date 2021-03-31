import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import * as Views from "./components/views";
import NavBar from "./components/Navigation";
import { Component } from "react";
import { handleInitialData } from "./actions/init";
import { connect } from "react-redux";

/* TODO progress
  ---features:
  proptypes
  questions - show You instead of Name when author is authedUser
  Show "Vote" instead of View on unanswered questions
  test App render called on every view - get data from db on each view rerender (componentDidMount?)
  testing
  ---cleanup:
  css - look
  css - fix elements for resized(smaller) window
  imports cleanup
  todos cleanup
  console.logs cleanup
*/

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData()).then(() => {
      console.group("App.componentDidMount");
      console.log(this.props);
      console.groupEnd();
    });
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.logged ? <NavBar /> : <Redirect to="/login" />}
        <div className="App">
          <Switch>
            <Route path="/login" component={Views.Login} />
            <Route path="/new" component={Views.New} />
            <Route path="/leaderboard" component={Views.LeaderBoard} />
            <Route path="/question/:id" component={Views.Poll} />
            <Route exact path="/" component={Views.Home} />
            <Route path="*" component={Views.NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    logged: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
