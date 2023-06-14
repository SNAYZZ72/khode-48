import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import logo from '../../logo.png'

const Header = () => {
  return (
    <Navbar sticky="top" expand="lg">
      <Container>
        <Navbar.Brand><img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" style={{ color: 'black', fontWeight: "500", marginLeft: '10px', marginRight: '10px' }}>HOME</Nav.Link>
            <Nav.Link href="/contact" style={{ color: 'black', fontWeight: "500", marginLeft: '10px', marginRight: '10px' }}>CONTACT</Nav.Link>
            <Nav.Link href="/about" style={{ color: 'black', fontWeight: "500", marginLeft: '10px', marginRight: '10px' }}>ABOUT US</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
