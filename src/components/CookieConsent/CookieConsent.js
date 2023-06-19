import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    setShowConsent(hasConsented !== 'true');
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="modal-popup modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <img className="float-left mr-2" src="assets/images/kode48-color-only.png" alt="Logo" />
            <h1 className="float-left ml-1">{t('cookiePolicy')}</h1>
            <button type="button" className="close" onClick={handleDecline}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{t('cookieMessage')}</p>
            <form noValidate>
              <div className="clearfix mt-4">
                <div className="float-left mr-3 cookie-type">
                  <input type="checkbox" className="mr-2"  />
                  <label style={{ textTransform: 'uppercase' }}>{t('necessaryCookies')}</label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={handleAccept}>{t('acceptAll')}</button>
            <button className="btn btn-secondary" onClick={handleAccept}>{t('accept')}</button>
            <div className="text-center mt-2">
              <a className="btn btn-link" href="#configure">{t('configure')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
