import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from './kode48-color-only.png';

import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

//import components
import LanguageSelector from '../LanguageSelector';

const HeaderYouth = () => {
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

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user from Firebase Authentication
      // Perform any additional actions after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle the error appropriately
    }
  };


  return (
    <Navbar sticky="top" expand="sm" style={{ paddingLeft: '20px', paddingRight: '20px', backgroundColor: showHeader ? 'white' : 'rgba(255, 255, 255, 0.95)', boxShadow: showHeader ? 'none' : '0px 1px 0px rgba(0, 0, 0, 0.2)' }}>
      <Navbar.Brand>
        <a href="/" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="Logo" style={{ width: '120px' }} />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            href="/profileYouth"
            className={location.pathname === '/profileYouth' ? 'active-link' : ''}
            style={{ color: location.pathname === '/profileYouth' ? '#F24726' : 'black', textDecoration: location.pathname === '/profileYouth' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
          >
            Profile
          </Nav.Link>
          <Nav.Link
            href="/homeYouth"
            className={location.pathname === '/homeYouth' ? 'active-link' : ''}
            style={{ color: location.pathname === '/homeYouth' ? '#F24726' : 'black', textDecoration: location.pathname === '/homeYouth' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
          >
            Home
          </Nav.Link>
          <Nav.Link
            href="/"
            className={location.pathname === '/' ? 'active-link' : ''}
            style={{ color: location.pathname === '/' ? '#F24726' : 'black', textDecoration: location.pathname === '/' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '50px' }}
            onClick={handleLogout}
          >
            Logout
          </Nav.Link>
          <div style={{ marginLeft: '10px' }}>
            <LanguageSelector />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderYouth;
