import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (hasConsented === 'true') {
      setShowConsent(false);
    }
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
    <div className="modal-popup ng-tns-c20-0 ng-trigger ng-trigger-fadeAnim ng-star-inserted" style={{}}>
      <div role="landmark" className="inner-content ng-tns-c20-0">
        <div className="main-content ng-tns-c20-0 ng-star-inserted" style={{}}>
          <div className="clearfix ng-tns-c20-0">
            <img className="float-left mr-2 ng-tns-c20-0 ng-star-inserted" src="assets/images/kode48-color-only.png" alt="Logo" />
            <h1 className="float-left ml-1 ng-tns-c20-0">Cookie Policy</h1>
          </div>
          <p className="mt-3 ng-tns-c20-0">
            We use our own and third-party cookies to personalize the advertising you see and offer you content based on your browsing habits (visited pages, frequency of access, time spent, etc.) to analyze how you use this website. To accept all cookies, click the "Accept" button or you can configure them by clicking the "Configure" button. For more information, consult our privacy policy.
          </p>
          <div className="ng-tns-c20-0 ng-star-inserted">
            <form noValidate className="ng-tns-c20-0 ng-untouched ng-pristine">
              <div className="clearfix mt-4 ng-tns-c20-0">
                <div className="float-left mr-3 cookie-type ng-tns-c20-0 ng-star-inserted">
                  <input type="checkbox" className="mr-2 ng-tns-c20-0 ng-untouched ng-pristine" disabled="" />
                  <label className="ng-tns-c20-0" style={{ textTransform: 'uppercase' }}>Necessary cookies</label>
                </div>
              </div>
            </form>
          </div>
          <button className="mt-4 button-full-width ng-tns-c20-0" onClick={handleAccept}>Accept All</button>
          <button className="mt-3 secondary-button button-full-width ng-tns-c20-0" onClick={handleDecline}>Accept</button>
          <div className="text-center mt-2 ng-tns-c20-0">
            <a className="individual-settings-button ng-tns-c20-0" href="#configure">Configure</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
