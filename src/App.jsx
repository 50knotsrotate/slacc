/* tslint:disable */
import * as React from "react";
import "./App.css";
import io from "socket.io-client";
import Navbar from "react-bootstrap/Navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark" className="mb-5">
          <Navbar.Brand href="#home">Slacc</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="#login">Sign Up</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container className = 'mb-5'>
          <Row>
            <Col sm={12} lg={6}>
              <h4>DUMMY TEXT</h4>
              <h1 className="p-0 pb-2">
                <b>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, maiores.
                </b>
              </h1>
              <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ad odio perferendis nam eveniet in fuga provident nihil, voluptatem repudiandae? Exercitationem neque aspernatur repudiandae esse voluptate! Ut dolorum placeat impedit!</p>
              <Button className="mr-2" variant="primary" size="lg">
                Button
              </Button>
              <Button variant="outline-primary" size="lg">
                Button 2
              </Button>
              <p className="mt-3">
                This could be a <a href="#">link</a>
              </p>
            </Col>
            <Col sm={12} lg={6}>
              <Image
                src="https://www.gmtsworkwear.com/wp-content/uploads/2014/04/CSW.jpg"
                className="h-100 w-100"
              />
            </Col>
          </Row>
        </Container>
        <Jumbotron bg = 'dark' variant = 'dark ' className = 'text-center'>
          <h1 className = 'mb-3'>Sign Up For More Stuff</h1>
          <Form.Group>
            <Form.Control size = 'lg' type = 'email' placeholder = 'Email' className = 'w-25 mx-auto' />
          </Form.Group>
        </Jumbotron>
        <Container className="text-center my-5">
          <h1>
            <b>Some more lorem ipsum</b>
          </h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus,
            consequatur.
          </p>
          <Image src='https://i.ytimg.com/vi/0_yT0iSG0l0/maxresdefault.jpg' style={{width: '100%', margin: '0 auto;'}}/>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
