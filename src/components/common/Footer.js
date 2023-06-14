import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <Navbar fixed="bottom" style={{ backgroundColor: '#F24726' }}>
      <Nav className="flex-column">
        <Nav.Link href="/contact" style={{ color: 'white', fontWeight: "500" }}>CONTACT</Nav.Link>
        <Nav.Link href="/about" style={{ color: 'white', fontWeight: "500" }}>ABOUT US</Nav.Link>
        <Nav.Link href="/terms" style={{ color: 'white', fontWeight: "500" }}>TERMS & CONDITIONS</Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link href="/faq" style={{ color: 'white', fontWeight: "500" }}>FAQ</Nav.Link>
        <Nav.Link href="/careers" style={{ color: 'white', fontWeight: "500" }}>CAREERS</Nav.Link>
        <Nav.Link href="/country" style={{ color: 'white', fontWeight: "500" }}>CHANGE COUNTRY</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="https://twitter.com" style={{ color: 'white', fontSize: '50px', margin: '10px' }}>
          <FontAwesomeIcon icon={faTwitter} />
        </Nav.Link>
        <Nav.Link href="https://www.facebook.com" style={{ color: 'white', fontSize: '50px', margin: '10px' }}>
          <FontAwesomeIcon icon={faFacebook} />
        </Nav.Link>
        <Nav.Link href="https://www.instagram.com" style={{ color: 'white', fontSize: '50px', margin: '10px' }}>
          <FontAwesomeIcon icon={faInstagram} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;
