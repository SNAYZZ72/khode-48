import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from '../../kode48-color-only.png';

//import components
import LanguageSelector from './LanguageSelector';

const HeaderIntermediary = () => {
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
    <Navbar sticky="top" expand="lg" style={{ paddingLeft: '20px', paddingRight: '20px', backgroundColor: showHeader ? 'white' : 'rgba(255, 255, 255, 0.95)', boxShadow: showHeader ? 'none' : '0px 1px 0px rgba(0, 0, 0, 0.2)' }}>
        <Navbar.Brand>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="Logo" style={{ width: '120px' }} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className={location.pathname === '/' ? 'active-link' : ''}
              style={{ color: location.pathname === '/' ? '#F24726' : 'black', textDecoration: location.pathname === '/' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className={location.pathname === '/contact' ? 'active-link' : ''}
              style={{ color: location.pathname === '/contact' ? '#F24726' : 'black', textDecoration: location.pathname === '/contact' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
            >
              CONTACT
            </Nav.Link>
            <Nav.Link
              href="/about"
              className={location.pathname === '/about' ? 'active-link' : ''}
              style={{ color: location.pathname === '/about' ? '#F24726' : 'black', textDecoration: location.pathname === '/about' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
            >
              ABOUT US
            </Nav.Link>
            <LanguageSelector />
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderIntermediary;
