import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <Navbar style={{ backgroundColor: '#F24726' }} className="d-flex justify-content-between align-items-center">
      <Nav className="flex-column">
        {/* Contenu de la première colonne */}
        <Nav.Link href="/contact" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginLeft: '10px' }}>CONTACT</Nav.Link>
        <Nav.Link href="/about" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginLeft: '10px' }}>ABOUT US</Nav.Link>
        <Nav.Link href="/terms" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginLeft: '10px' }}>TERMS & CONDITIONS</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;

