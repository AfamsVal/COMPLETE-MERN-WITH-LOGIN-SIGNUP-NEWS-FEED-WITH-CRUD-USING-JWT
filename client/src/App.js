import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

class App extends Component {
  ///////
  /////////////
  ////////////////////
  ////RENDER /////////////////////
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Navbar />
          </Switch>

          <div className="container">
            <div className="row">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/contact" component={Contact} />
                <Logout exact path="/logout" />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
