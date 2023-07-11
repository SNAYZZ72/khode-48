import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../common/Header/Header'
import { Container } from 'react-bootstrap';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="About">
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{t('aboutTitle')}</h1>
            </div>
            <Container>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item profile-item">
                        <div className="row mb-3">
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="col">
                                        <h3>{t('companies')}</h3>
                                        <p>{t('companyDescription')}</p>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('youngPeople')}</h3>
                                            <p>{t('youngDescription')}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('intermediaries')}</h3>
                                            <p>{t('intermediaryDescription')}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <p>{t('aboutDescription1')}</p>
                                            <p>{t('aboutDescription2')}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </Container>
        </div>
    );
};

export default About;
