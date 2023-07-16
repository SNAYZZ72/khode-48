import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
//import footer.css
import './footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <footer className="footer-59391">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-6 ">
              <ul className="nav-links list-unstyled nav-left">
                <li><a href="/contact">{t('Contact')}</a></li>
                <li><a href="/about">{t('aboutTitle')}</a></li>
                <li><a href="/terms">{t('termsTitle')}</a></li>
              </ul>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="list-unstyled social-icons">
                <li><img href="#" src="/bfa.png" className="fb"/></li>
                <li><img href="#" src="/kultiva.svg" className="tw"/></li>
                <li><img href="#" src="/c2b.png" className="in"/></li>
                <li><img href="#" src="/bigel.png" className="be"/></li>
                <li><img href="#" src="/guuk.png" className="gk"/></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col ">
              <div className="copyright">
                <p><small><b>Kode48 © 2023.</b> All Rights Reserved.</small></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;


