import React from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from './flags/en.png';
import esFlag from './flags/es.png';
import euFlag from './flags/eu.png';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const currentLanguage = i18n.language; // Get the currently selected language

    return (
        <div>
            <button
                className={`btn btn-link p-0 m-0 ${currentLanguage === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
            >
                <img
                    src={enFlag}
                    alt="English"
                    style={{ width: '50px', height: '50px', border: 'none' }}
                    className="rounded-circle"
                />
            </button>
            <button
                className={`btn btn-link p-0 m-0 ${currentLanguage === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}
            >
                <img
                    src={esFlag}
                    alt="Spanish"
                    style={{ width: '50px', height: '50px', border: 'none' }}
                    className="rounded-circle"
                />
            </button>
            <button
                className={`btn btn-link p-0 m-0 ${currentLanguage === 'eu' ? 'active' : ''}`}
                onClick={() => changeLanguage('eu')}
            >
                <img
                    src={euFlag}
                    alt="Basque"
                    style={{ width: '50px', height: '50px', border: 'none' }}
                    className="rounded-circle"
                />
            </button>
        </div>
    );
};

export default LanguageSelector;
