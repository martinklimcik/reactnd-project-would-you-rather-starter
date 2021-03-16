import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import * as Views from "./components/views";
import NavBar from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
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
          <Route path="/poll">
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

export default App;
