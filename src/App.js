import React, { Component } from "react";
import MyEnhancedForm from "./components/withFormikMainForm";
import About from "./components/About";
import { Route, Switch, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>Formik Forms</Navbar.Brand>
        </Navbar>
        <ul>
          <li>
            <Link to="/Form">Form</Link>
          </li>
          <li>
            <Link to="/About">About Us</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/Form" name="Form" component={MyEnhancedForm} />
          <Route path="/About" name="About" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
