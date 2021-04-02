import "./App.css";
import { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { handleInitialData } from "./actions/init";
import NavBar from "./components/Navigation";
import * as Views from "./components/views";
import PropTypes from "prop-types";

/* TODO progress
  ---cleanup:
  todos cleanup
  console.logs cleanup
  css - look
  css - fix elements for resized(smaller) window
  testing https://review.udacity.com/#!/rubrics/1567/view
*/

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={NavBar} />
        </Switch>
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
