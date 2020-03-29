/* tslint:disable */
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const axios = require("axios");

import "./SignUp.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authType: "Sign Up",
      password: "",
      submitUrl: "http://localhost:80/signup",
      submitting: false,
      username: "",
      errorMessage: null
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    const { username, password } = this.state;

    this.setState({
      submitting: true
    });

    axios
      .post(this.state.submitUrl, { username, password })
      .then(res => {
        const { token } = res.data;
        if (token) {
          window.localStorage.setItem("token", token);
          }
          this.props.push('/home')
      })
      .catch(err => {
          this.setState({
              errorMessage: err.response.data.message,
              submitting: false
          })
      });
  };

  toggleFormType = () => {
    if (this.state.authType === "Sign Up") {
      this.setState({
        authType: "Sign In",
        submitUrl: "/http://localhost:80/signin"
      });
    } else {
      this.setState({
        authType: "Sign Up",
        submitUrl: "http://localhost:80/signup"
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          show={this.props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.authType}
              {this.state.authType === "Sign Up" ? (
                <p class="lead text-muted">
                  Already have an account ?{" "}
                  <span
                    className="btn btn-sm btn-light"
                    onClick={this.toggleFormType}
                  >
                    Log In
                  </span>
                </p>
              ) : (
                <p class="lead text-muted">
                  Need to make an account?{" "}
                  <span
                    className="btn btn-sm btn-light"
                    onClick={this.toggleFormType}
                  >
                    Sign Up
                  </span>
                </p>
              )}
              {this.state.errorMessage && (
                <p style={{ color: "red" }} class="lead p-0 m-0">
                  {this.state.errorMessage}
                </p>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Username
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={this.state.username}
                    onChange={e => this.handleInput(e)}
                    name="username"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    value={this.state.password}
                    onChange={e => this.handleInput(e)}
                    name="password"
                  />
                  {this.state.authType === "Sign Up" && (
                    <p class="text-muted">
                      * Must contain at least 8 characters and one number.
                    </p>
                  )}
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button>
              {this.state.submitting ? (
                "Please wait :)"
              ) : (
                <span className="lead" onClick={this.submitForm}>
                  Submit
                </span>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
