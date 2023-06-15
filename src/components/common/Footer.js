import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <Navbar style={{ backgroundColor: '#F24726' }}>
      <Nav className="flex-column">
        <Nav.Link href="/contact" style={{ color: 'white', fontWeight: "500", marginLeft: '10px' }}>CONTACT</Nav.Link>
        <Nav.Link href="/about" style={{ color: 'white', fontWeight: "500", marginLeft: '10px' }}>ABOUT US</Nav.Link>
        <Nav.Link href="/terms" style={{ color: 'white', fontWeight: "500", marginLeft: '10px' }}>TERMS & CONDITIONS</Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link href="/faq" style={{ color: 'white', fontWeight: "500", marginLeft: '20px' }}>FAQ</Nav.Link>
        <Nav.Link href="/careers" style={{ color: 'white', fontWeight: "500", marginLeft: '20px' }}>CAREERS</Nav.Link>
        <Nav.Link href="/country" style={{ color: 'white', fontWeight: "500", marginLeft: '20px' }}>CHANGE COUNTRY</Nav.Link>
      </Nav>
      <Nav className="flex-column">
        <Nav.Link href="https://twitter.com" style={{ color: 'white', fontSize: '20px', marginLeft: '20px' }}>
          <FontAwesomeIcon icon={faTwitter} />
        </Nav.Link>
        <Nav.Link href="https://www.facebook.com" style={{ color: 'white', fontSize: '20px', marginLeft: '20px' }}>
          <FontAwesomeIcon icon={faFacebook} />
        </Nav.Link>
        <Nav.Link href="https://www.instagram.com" style={{ color: 'white', fontSize: '20px', marginLeft: '20px' }}>
          <FontAwesomeIcon icon={faInstagram} />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;
