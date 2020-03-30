/* tslint:disable */
import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import axios from 'axios'

export default class JoinTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      submitUrl: "http://localhost:80/teams",
      submitting: false,
      teamName: "",
      teams: []
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    const identifier = window.localStorage.getItem("token");

    const instance = axios.create({
      baseURL: `http://localhost:80`,
      headers: { identifier },
      timeout: 1000
    });

      instance.get(`/teams?query=${this.state.teamName}`).then(res => {
        console.log(res.data)
      this.setState({
        teams: res.data
      });
    });
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
              <p className="lead">Search For Teams</p>

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
                  Team Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    value={this.state.teamName}
                    onChange={e => this.handleInput(e)}
                    name="teamName"
                  />
                </Col>
                {this.state.teams.map(team => {
                  return <p className="lead">{team.name}</p>;
                })}
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button>
              {this.state.submitting ? (
                "Please wait :)"
              ) : (
                <span
                  className="lead"
                  onClick={() => this.props.submit(this.state.teamName)}
                >
                  Join Team
                </span>
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}
