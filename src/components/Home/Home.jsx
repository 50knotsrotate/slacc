import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/Buttongroup";

import NewTeam from "../Modals/NewTeam/NewTeam";
import io from "socket.io-client";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:80");
    this.state = {
      channels: [],
      hoverStateItem: null,
      messages: [],
      showNewTeamModal: false,
      teams: []
    };
  }

  componentDidMount = () => {
    const identifier = window.localStorage.getItem("token");

    const instance = axios.create({
      baseURL: `http://localhost:80`,
      headers: { identifier },
      timeout: 1000
    });

    instance
      .get(`/token`)
      .then(res => {
        return;
      })
      .catch(err => {
        this.props.history.push("/");
      });
  };

  getChannelMessages = channel => {
    alert(channel);
    const identifier = window.localStorage.getItem("token");

    const instance = axios.create({
      baseURL: `http://localhost:80`,
      headers: { identifier },
      timeout: 1000
    });
  };

  // createNewTeam = () => {
  //   const identifier = window.localStorage.getItem("token");

  //   const instance = axios.create({
  //     baseURL: `http://localhost:80`,
  //     headers: { identifier },
  //     timeout: 1000
  //   });

  //   instance.post(`/teams`).then(res => {
  //     // console.log(res)
  //   });
  // };

  createTeam = teamName => {
    const identifier = window.localStorage.getItem("token");
    const instance = axios.create({
      baseURL: `http://localhost:80`,
      headers: { identifier },
      timeout: 1000
    });
    instance.post(`/teams`, {teamName}).then(res => {
      this.setState({
        showNewTeamModal: false
      })
    }).catch(err => { 
      alert('error')
    })
  };

  render() {
    const socket = io("http://localhost:80");
    // const teams = this.state.teams.map(team => <h1>{team}</h1>)
    return (
      <Container fluid>
        <Row>
          <Col className="bg-primary" sm={4}>
            <Dropdown className="text-center">
              <Dropdown.Toggle
                className="border-bottom"
                variant="primary"
                id="dropdown-basic"
              >
                Teams
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item className="w-100" href="#/action-1">
                  Action
                </Dropdown.Item>
                <Dropdown.Item className="w-100" href="#/action-1">
                  Action
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Item
                  className="bg-info text-light w-100"
                  href="#/action-3"
                >
                  Join Team +
                </Dropdown.Item>
                <Dropdown.Item
                  className="bg-success text-light w-100"
                  href="#/action-3"
                  onClick={() => {
                    this.setState({ showNewTeamModal: true });
                  }}
                >
                  Create New Team +
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ListGroup as="ul" variant="flush" style={{ minHeight: "100vh" }}>
              <ListGroup.Item active>
                <span className="lead mx-0 px-0 display-5">Channels</span>
              </ListGroup.Item>
              {this.state.teams.map(team => {
                return (
                  <ListGroup.Item
                    as="li"
                    onClick={() => this.getChannelMessages(team)}
                  >
                    {team}
                  </ListGroup.Item>
                );
              })}
              <Button>Add New Channel +</Button>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <h1>This is the rest of home</h1>
          </Col>
        </Row>

        {/* MODALS */}
        <NewTeam show={this.state.showNewTeamModal} submit={this.createTeam} />
      </Container>
    );
  }
}
