import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../logo.png';

//import components
import LanguageSelector from './LanguageSelector';
// import about from './components/Pages/About/About'

const Header = () => {
  return (
    <Navbar sticky="top" expand="lg">
      <Container>
      <Navbar.Brand>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', position: 'fixed', left: '10px', top: '10px' }} />
        </a>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" style={{ color: 'black', fontWeight: '650', marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>HOME</Nav.Link>
            <Nav.Link href="/contact" style={{ color: 'black', fontWeight: '650', marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>CONTACT</Nav.Link>
            <Nav.Link href="/about" style={{ color: 'black', fontWeight: '650', marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>ABOUT US</Nav.Link>
            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
