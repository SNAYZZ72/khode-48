import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from '../../logo.png';

//import components
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      setShowHeader(isTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar sticky="top" expand="lg" style={{ paddingLeft: '20px', paddingRight: '20px', backgroundColor: 'white', boxShadow: showHeader ? 'none' : '0px 1px 0px black' }}>
        <Navbar.Brand>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', position: 'fixed', left: '10px', top: '0px' }} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className={location.pathname === '/' ? 'active-link' : ''}
              style={{ color: location.pathname === '/' ? '#F24726' : 'black', textDecoration: location.pathname === '/' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px', marginTop: '5px' }}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className={location.pathname === '/contact' ? 'active-link' : ''}
              style={{ color: location.pathname === '/contact' ? '#F24726' : 'black', textDecoration: location.pathname === '/contact' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px', marginTop: '5px' }}
            >
              CONTACT
            </Nav.Link>
            <Nav.Link
              href="/about"
              className={location.pathname === '/about' ? 'active-link' : ''}
              style={{ color: location.pathname === '/about' ? '#F24726' : 'black', textDecoration: location.pathname === '/about' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px', marginTop: '5px' }}
            >
              ABOUT US
            </Nav.Link>
            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
