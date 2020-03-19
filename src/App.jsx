/* tslint:disable */
import * as React from "react";
import "./App.css";
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import Jumbotron from 'react-bootstrap/Jumbotron';


class App extends React.Component {

  render() {

    return (
      <Container>
        <Jumbotron variant = "danger">
      <h1>Bootstrap is working!</h1>
        </Jumbotron>
  </Container>
    )
  }
}

export default App;
