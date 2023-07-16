import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from './kode48-color-only.png';
import { useTranslation } from 'react-i18next';

//import components
import LanguageSelector from '../LanguageSelector';

const HeaderCompany = () => {
    const { t } = useTranslation();
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
                        href="/profileCompany"
                        className={location.pathname === '/profileCompany' ? 'active-link' : ''}
                        style={{ color: location.pathname === '/profileCompany' ? '#F24726' : 'black', textDecoration: location.pathname === '/profileCompany' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
                    >
                        {t('profile')}
                    </Nav.Link>
                    <Nav.Link
                        href="/homeCompany"
                        className={location.pathname === '/homeCompany' ? 'active-link' : ''}
                        style={{ color: location.pathname === '/homeCompany' ? '#F24726' : 'black', textDecoration: location.pathname === '/homeCompany' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '10px' }}
                    >
                        {t('home')}
                    </Nav.Link>
                    <Nav.Link
                        href="/"
                        className={location.pathname === '/' ? 'active-link' : ''}
                        style={{ color: location.pathname === '/' ? '#F24726' : 'black', textDecoration: location.pathname === '/' ? 'underline' : 'none', fontWeight: '650', marginLeft: '10px', marginRight: '50px' }}
                    >
                        {t('logout')}
                    </Nav.Link>
                    <div style={{ marginLeft: '10px' }}>
                        <LanguageSelector />
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderCompany;
