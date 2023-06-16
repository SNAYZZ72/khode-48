import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (hasConsented === true) {
      setShowConsent(false);
    }
  }, []);

  const handleAccept = () => {
    // Enregistrer le consentement de l'utilisateur, par exemple dans le stockage local (localStorage)
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDecline = () => {
    // Enregistrer le non consentement de l'utilisateur, par exemple dans le stockage local (localStorage)
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) {
    return null; // Si l'utilisateur a déjà accepté les cookies, ne pas afficher le pop-up
  }

  return (
    <div className="cookie-consent">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer sur le site, vous acceptez notre utilisation des cookies.
      </p>
      <div>
        <button onClick={handleAccept}>J'accepte</button>
        <button onClick={handleDecline}>Je refuse</button>
      </div>
    </div>
  );
};

export default CookieConsent;