import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';


function NavigBar() {
  return (
    <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>Algo Storm</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/algos">Algos</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Navbar>
    </div>
  );
}

export default NavigBar;
