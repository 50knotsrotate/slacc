import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import NavBar from "../Navbar/Navbar";

import io from 'socket.io-client';
import axios from 'axios';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:80')
    this.state = {
      channels: [],
      hoverStateItem: null,
      messages: [],
        teams: ["Tech", "Design", "Foo", "Bar"]
    };
    }
    
    getChannelMessages = channel => { 
        alert(channel)
           const identifier = window.localStorage.getItem("token");

           const instance = axios.create({
             baseURL: `http://localhost:80`,
             headers: { identifier },
             timeout: 1000
           });
        
        instance.get(`/${channel}/poop/messages`)
            .then(res => { 
                // console.log(res)
            })
        
    }

    render() {
      const socket = io('http://localhost:80')
    // const teams = this.state.teams.map(team => <h1>{team}</h1>)
    return (
      <Container fluid>
        <Row>
          <Col className="bg-primary" sm={4}>
            <ListGroup as="ul" variant="flush" style={{ minHeight: "100vh" }}>
              <ListGroup.Item active>
                <span className="lead mx-0 px-0 display-5">Channels</span>
              </ListGroup.Item>
                        {this.state.teams.map(team => {
                return (
                    <ListGroup.Item as="li" onClick={() => this.getChannelMessages(team)}>
                    {team}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <h1>This is the rest of home</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
