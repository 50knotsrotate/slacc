import React from "react";
import Navbar from "react-bootstrap/Navbar";


export default function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Navbar.Brand href="#home">Slacc</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a onClick={props.toggleModal}>
            Sign Up / Login
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
