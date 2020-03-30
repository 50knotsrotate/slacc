/* tslint:disable */
import * as React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import SignUp from "../Modals/SignUp/SignUp";

import axios from "axios";

import Navbar from "../Navbar/Navbar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentDidMount = () => {
    const identifier = window.localStorage.getItem("token");

    if (identifier) {
      const instance = axios.create({
        baseURL: "http://localhost:80",
        timeout: 1000,
        headers: { identifier }
      });

      instance
        .get("/token")
        .then(res => {
          this.props.history.push("/home");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.toggleModal
    });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar toggleModal={this.toggleModal} />
        <Container className="mb-5">
          <Row>
            <Col sm={12} lg={6}>
              <h4>DUMMY TEXT</h4>
              <h1 className="p-0 pb-2">
                <b>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, maiores.
                </b>
              </h1>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam ad odio perferendis nam eveniet in fuga provident
                nihil, voluptatem repudiandae? Exercitationem neque aspernatur
                repudiandae esse voluptate! Ut dolorum placeat impedit!
              </p>
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
              <div
                style={{
                  backgroundImage:
                    "url(https://www.gmtsworkwear.com/wp-content/uploads/2014/04/CSW.jpg)",
                  width: "100%",
                  height: "100%"
                }}
              >
                {/* Had to put the image in a div like this because the bootstrp Image component overflows its container. Quick fix. */}
                {/* <Image
                  src="https://www.gmtsworkwear.com/wp-content/uploads/2014/04/CSW.jpg"
                /> */}
              </div>
            </Col>
          </Row>
        </Container>
        <Jumbotron bg="dark" variant="dark " className="text-center">
          <h1 className="mb-3">Sign Up For More Stuff</h1>
          <Form.Group>
            <Form.Control
              size="lg"
              type="email"
              placeholder="Email"
              className="w-25 mx-auto"
            />
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
          <Image
            src="https://i.ytimg.com/vi/0_yT0iSG0l0/maxresdefault.jpg"
            style={{ width: "100%", margin: "0 auto;" }}
          />
        </Container>

        <SignUp show={this.state.showModal} push={this.props.history.push} />
      </React.Fragment>
    );
  }
}

export default App;
