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
                                            <h5>{t('h5privacidad1')}</h5>
                                            <p>{t('pprivacidad1')}</p>
                                            <h5>{t('h5privacidad2')}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <h5>{t('h5privacidad3')}</h5>
                                                    <p>{t('pprivacidad2')}</p>
                                                    <p>{t('pprivacidad3')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <h5>{t('h5privacidad4')}</h5>
                                                    <p>{t('pprivacidad4')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <h5>{t('h5privacidad5')}</h5>
                                                </li>
                                                <li className="list-group-item">
                                                    <h5>{t('h5privacidad6')}</h5>
                                                    <p>{t('pprivacidad5')}</p>
                                                    <p>{t('pprivacidad6')}</p>
                                                    <p>{t('pprivacidad7')}</p>
                                                    <p>{t('pprivacidad8')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <h5>{t('h5privacidad7')}</h5>
                                                    <p>{t('pprivacidad9')}</p>
                                                    <p>{t('pprivacidad10')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <h5>{t('h5privacidad8')}</h5>
                                                </li>
                                            </ul>
                                            <h5>{t('h5privacidad9')}</h5>
                                            <h5>{t('h5privacidad10')}</h5>
                                            <p>{t('pprivacidad11')}</p>
                                            <p>{t('pprivacidad12')}</p>
                                            <h5>{t('h5privacidad11')}</h5>
                                            <p>{t('pprivacidad13')}</p>
                                            <h5>{t('h5privacidad12')}</h5>
                                            <p>{t('pprivacidad14')}</p>
                                            <h5>{t('h5privacidad13')}</h5>
                                            <h5>{t('h5privacidad14')}</h5>
                                            <h5>{t('h5privacidad15')}</h5>
                                            <h5>{t('h5privacidad16')}</h5>
                                            <h5>{t('h5privacidad17')}</h5>
                                            <h5>{t('h5privacidad18')}</h5>
                                            <h5>{t('h5privacidad19')}</h5>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('h3calidad')}</h3>
                                            <h5>{t('h5calidad1')}</h5>
                                            <p>{t('pcalidad1')}</p>
                                            <p>{t('pcalidad2')}</p>
                                            <p>{t('pcalidad3')}</p>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <p>{t('pcalidad4')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <p>{t('pcalidad5')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <p>{t('pcalidad6')}</p>
                                                </li>
                                                <li className="list-group-item">
                                                    <p>{t('pcalidad7')}</p>
                                                </li>
                                            </ul>
                                            <p>{t('pcalidad8')}</p>
                                            <p>{t('pcalidad9')}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('h3aviso')}</h3>
                                            <h5>{t('h5aviso1')}</h5>
                                            <p>{t('paviso1')}</p>
                                            <p>{t('paviso2')}</p>
                                            <p>{t('paviso3')}</p>
                                            <h5>{t('h5aviso2')}</h5>
                                            <p>{t('paviso4')}</p>
                                            <p>{t('paviso5')}</p>
                                            <p>{t('paviso6')}</p>
                                            <h5>{t('h5aviso3')}</h5>
                                            <p>{t('paviso7')}</p>
                                            <p>{t('paviso8')}</p>
                                            <p>{t('paviso9')}</p>
                                            <p>{t('paviso10')}</p>
                                            <p>{t('paviso11')}<b>{t('paviso12')}</b></p>
                                            <h5>{t('h5aviso4')}</h5>
                                            <p>{t('paviso13')}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group" style={{ paddingBottom: '20px' }}>
                                <li className="list-group-item">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h3>{t('h3calidad')}</h3>
                                            <h5>{t('h5calidad1')}</h5>
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
