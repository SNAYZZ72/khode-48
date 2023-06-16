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
      <Nav className="align-items-center">
        {/* Contenu de la dernière colonne */}
        <Nav.Link href="https://twitter.com" target="_blank" style={{ color: 'white', fontSize: '40px' }}>
          <FontAwesomeIcon icon={faTwitter} />
        </Nav.Link>
        <Nav.Link href="https://www.facebook.com" target="_blank" style={{ color: 'white', fontSize: '40px' }}>
          <FontAwesomeIcon icon={faFacebook} />
        </Nav.Link>
        <Nav.Link href="https://www.instagram.com" target="_blank" style={{ color: 'white', fontSize: '40px' }}>
          <FontAwesomeIcon icon={faInstagram} />
        </Nav.Link>
      </Nav>
      <Nav className="flex-column text-end">
        {/* Contenu de la colonne centrale */}
        <Nav.Link href="/FAQ" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginRight: '10px' }}>FAQ</Nav.Link>
        <Nav.Link href="/careers" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginRight: '10px' }}>CAREERS</Nav.Link>
        <Nav.Link href="/country" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginRight: '10px' }}>CHANGE COUNTRY</Nav.Link>
      </Nav>

    </Navbar>
  );
}

export default Footer;

