/* tslint:disable */
import * as React from "react";
import "./App.css";
import io from "socket.io-client";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import SignUp from "./components/Modals/SignUp/SignUp";

import Landing from "./components/Landing/Landing";
import Home from './components/Home/Home';

import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className = 'app'>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
