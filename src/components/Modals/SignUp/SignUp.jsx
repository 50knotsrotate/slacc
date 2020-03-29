import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authType: "Sign Up",
      password: "",
      submitUrl: "/signup",
      submitting: false,
      username: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
      this.setState({
          submitting: true
      })
  };

  toggleFormType = () => {
    alert("yoooo");
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
                  <p class="text-muted">
                    * Must contain at least 8 characters and one number.
                  </p>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
                    <Button onClick={e => this.submitForm(e)}>
                        {this.state.submitting ? 'Please wait :)' : 'Submit'}
                        </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
