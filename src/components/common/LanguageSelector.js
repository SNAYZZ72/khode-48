import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from './flags/en.png';
import esFlag from './flags/es.png';
import euFlag from './flags/eu.png';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const [showFlags, setShowFlags] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('selectedLanguage', lng);
        setShowFlags(false); // Masquer les drapeaux après avoir changé la langue
    };

    useEffect(() => {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
          i18n.changeLanguage(selectedLanguage);
        }
      }, [i18n]);

    const currentLanguage = i18n.language; // Obtenir la langue actuellement sélectionnée

    const toggleFlags = () => {
        setShowFlags(!showFlags);
    };

    return (
        <div style={{ paddingTop: '12px' }}>
            <button
                className={`btn btn-link p-0 m-0 ${currentLanguage === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                {showFlags && (
                    <img
                        src={enFlag}
                        alt="English"
                        style={{ width: '40px', height: '30px', borderRadius: '5px' }}
                    />
                )}
            </button>
            <button
                className={`btn btn-link p-0 m-0 ${currentLanguage === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
            >
                {showFlags && (
                    <img
                        src={esFlag}
                        alt="Spanish"
                        style={{ width: '40px', height: '30px', borderRadius: '5px' }}
                    />
                )}
            </button>
            <button
                className={`btn btn-link p-0 m-0 ${currentLanguage === 'eu' ? 'active' : ''}`}
                onClick={() => changeLanguage('eu')}
            >
                {showFlags && (
                    <img
                        src={euFlag}
                        alt="Basque"
                        style={{ width: '40px', height: '30px', borderRadius: '5px' }}
                    />
                )}
            </button>
            {!showFlags && (
                <button
                    className="btn btn-link p-0 m-0"
                    onClick={toggleFlags}
                >
                    <img
                        src={currentLanguage === 'en' ? enFlag : (currentLanguage === 'es' ? esFlag : euFlag)}
                        alt={currentLanguage === 'en' ? 'English' : (currentLanguage === 'es' ? 'Spanish' : 'Basque')}
                        style={{ width: '40px', height: '30px', borderRadius: '5px' }}
                    />
                </button>
            )}
        </div>
    );
};

export default LanguageSelector;
