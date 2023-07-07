import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
    setShowLanguages(false); // Masquer les langues après avoir changé la langue
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [i18n]);

  const currentLanguage = i18n.language; // Obtenir la langue actuellement sélectionnée

  const toggleLanguages = () => {
    setShowLanguages(!showLanguages);
  };

  const languageStyle = {
    cursor: 'pointer',
    color: 'black',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    fontSize: '25px',
    textDecoration: 'none',
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: '0',
    zIndex: '999',
  };

  const activeLanguageStyle = {
    ...languageStyle,
    color: '#F24726',
    textDecoration: 'underline',
  };

  const availableLanguages = [
    { language: 'en', text: 'EN' },
    { language: 'es', text: 'ES' },
    { language: 'eu', text: 'EU' },
  ];

  const filteredLanguages = availableLanguages.filter((lang) => lang.language !== currentLanguage);

  return (
    <div style={{ position: 'relative' }}>
      {showLanguages && (
        <div style={columnStyle}>
          {filteredLanguages.map((lang) => (
            <div
              key={lang.language}
              className="btn btn-link p-0 m-0"
              style={languageStyle}
              onClick={() => changeLanguage(lang.language)}
            >
              {lang.text}
            </div>
          ))}
        </div>
      )}
      <div
        className="btn btn-link p-0 m-0"
        style={activeLanguageStyle}
        onClick={toggleLanguages}
      >
        <span style={{ display: 'inline-block' }}>
          {currentLanguage === 'en' ? 'EN' : currentLanguage === 'es' ? 'ES' : 'EU'}
        </span>
      </div>
    </div>
  );
};

export default LanguageSelector;
