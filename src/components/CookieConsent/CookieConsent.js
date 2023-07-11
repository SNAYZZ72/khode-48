import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';

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

  const isAnyModalOpen = () => {
    const openModals = document.getElementsByClassName('modal fade show');
    return openModals && openModals.length > 0;
  };

  if (!showConsent || isAnyModalOpen()) {
    return null;
  }

  return (
    <Modal
      onHide={handleDecline}
      centered
      backdrop="static"
      keyboard={false}
      show={showConsent}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('cookiePolicy')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('cookieMessage')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
          onClick={handleAccept}
        >
          {t('accept')}
        </Button>
        <Button variant="secondary" onClick={handleDecline}>
          {t('decline')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CookieConsent;
