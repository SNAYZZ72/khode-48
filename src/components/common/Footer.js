import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar style={{ backgroundColor: '#F24726' }} className="d-flex justify-content-between align-items-center">
      <Nav className="flex-column">
        {/* Contenu de la première colonne */}
        <Nav.Link href="/contact" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginLeft: '10px' }}>Contact</Nav.Link>
        <Nav.Link href="/about" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginLeft: '10px' }}>About us</Nav.Link>
        <Nav.Link href="/terms" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginLeft: '10px' }}>Terms & conditions</Nav.Link>
      </Nav>
      <Nav className="align-items-center">
        <div className="row">
          <div className="col-md-3 text-center">
            <Nav.Link href="https://www.bizkaia.eus/es/inicio" target="_blank">
              <img src="bfa.png" className="footer-icon" style={{ height:'40px', width: 'auto' }} />
            </Nav.Link>
          </div>
          <div className="col-md-3 text-center">
            <Nav.Link href="https://www.kultiba.net/" target="_blank">
              <img src="kultiva.svg" className="footer-icon" style={{ height:'50px', width: 'auto' }} />
            </Nav.Link>
          </div>
          <div className="col-md-3 text-center">
            <Nav.Link href="https://www.campus2b.com/" target="_blank">
              <img src="c2b.png" className="footer-icon" style={{ height:'40px', width: 'auto' }} />
            </Nav.Link>
          </div>
          <div className="col-md-3 text-center">
            <Nav.Link href="http://www.staybigel.com/" target="_blank">
              <img src="bigel.png" className="footer-icon" style={{ height:'40px', width: 'auto' }} />
            </Nav.Link>
          </div>
        </div>
      </Nav>
      <Nav className="flex-column text-end">
        {/* Contenu de la colonne centrale */}
        <Nav.Link href="/FAQ" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginRight: '10px' }}>Aviso legal</Nav.Link>
        <Nav.Link href="/careers" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginRight: '10px' }}>Politica de Cookies</Nav.Link>
        <Nav.Link href="/country" style={{ color: 'white', fontWeight: '500', fontSize: '15px', marginRight: '10px' }}>Politica de privacidad</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;

