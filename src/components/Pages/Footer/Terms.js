import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../common/Header/Header'
import { Container } from 'react-bootstrap';

const Terms = () => {
    const { t } = useTranslation();

    return (
        <div className="Terms">
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{t('termsTitle')}</h1>
            </div>
            <Container>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item profile-item">
                        <div className="row mb-3">
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="col">
                                        <h3>{t('h3cookie')}</h3>
                                        <h5>{t('h5cookie1')}</h5>
                                        <p>{t('pcookie1')}</p>
                                        <p>{t('pcookie2')}</p>
                                        <h5>{t('h5cookie2')}</h5>
                                        <p>{t('pcookie3')}</p>
                                        <p>{t('pcookie4')}</p>
                                        <h5>{t('h5cookie3')}</h5>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <h5>{t('h5cookie4')}</h5>
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie5')}</h5>
                                                        <p>{t('pcookie5')}</p>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie6')}</h5>
                                                        <p>{t('pcookie6')}</p>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="list-group-item">
                                                <h5>{t('h5cookie7')}</h5>
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie8')}</h5>
                                                        <p>{t('pcookie7')}</p>
                                                        <p>{t('pcookie8')}</p>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie9')}</h5>
                                                        <p>{t('pcookie9')}</p>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie10')}</h5>
                                                        <p>{t('pcookie10')}</p>
                                                        <p>{t('pcookie11')}</p>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie11')}</h5>
                                                        <p>{t('pcookie12')}</p>
                                                        <p>{t('pcookie13')}</p>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="list-group-item">
                                                <h5>{t('h5cookie12')}</h5>
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie13')}</h5>
                                                        <p>{t('pcookie14')}</p>
                                                    </li>
                                                    <li className="list-group-item">
                                                        <h5>{t('h5cookie14')}</h5>
                                                        <p>{t('pcookie15')}</p>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <h5>{t('h5cookie15')}</h5>
                                        <p>{t('pcookie16')}<b>{t('pcookie17')}</b></p>
                                        <h5>{t('h5cookie16')}</h5>
                                        <p>{t('pcookie18')}</p>
                                        <p>{t('pcookie19')}</p>
                                        <p>{t('pcookie20')}</p>
                                        <h5>{t('h5cookie17')}</h5>
                                        <p>{t('pcookie21')}</p>
                                        <p>{t('pcookie22')}</p>
                                        <p>{t('pcookie23')}</p>
                                        <p>{t('pcookie24')}</p>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('h3privacidad')}</h3>
                                            <p>{t('youngDescription')}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('intermediary')}</h3>
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

export default Terms;
