import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import * as Views from "./components/views";
import NavBar from "./components/Navigation";
import { Component } from "react";
import { handleInitialData } from "./actions/init";
import { connect } from "react-redux";

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
            <Route path="/login">
              <Views.Login />
            </Route>
            <Route path="/new">
              <Views.New />
            </Route>
            <Route path="/leaderboard">
              <Views.LeaderBoard />
            </Route>
            <Route path="/question">
              <Views.Poll />
            </Route>
            <Route exact path="/">
              <Views.Home />
            </Route>
            <Route path="*">
              <Views.NotFound />
            </Route>
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
