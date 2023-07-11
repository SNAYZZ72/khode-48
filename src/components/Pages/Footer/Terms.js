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
                            <ul className="list-group">
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
                                            <h5>{t('h5aviso5')}</h5>
                                            <p>{t('paviso14')}</p>
                                            <p>{t('paviso15')}</p>
                                            <p>{t('paviso16')}</p>
                                            <p>{t('paviso17')}</p>
                                            <p>{t('paviso18')}</p>
                                            <p>{t('paviso19')}</p>
                                            <h5>{t('h5aviso6')}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <h5>{t('h5aviso7')}</h5>
                                                    <p>{t('paviso20')}</p>
                                                    <p>{t('paviso21')}</p>
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            <h5>{t('h5aviso8')}</h5>
                                                            <p>{t('paviso22')}</p>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <h5>{t('h5aviso9')}</h5>
                                                            <p>{t('paviso23')}</p>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <h5>{t('h5aviso10')}</h5>
                                                            <p>{t('paviso24')}</p>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <h5>{t('h5aviso11')}</h5>
                                                            <p>{t('paviso25')}</p>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <h5>{t('h5aviso12')}</h5>
                                                            <p>{t('paviso26')}</p>
                                                        </li>
                                                    </ul>
                                                    <h5>{t('h5aviso13')}</h5>
                                                    <p>{t('paviso27')}</p>
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            <p>{t('paviso28')}<b>{t('paviso29')}</b></p>
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso30')}</p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso31')}<b>{t('paviso32')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso33')}<b>{t('paviso34')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso35')}<b>{t('paviso36')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso37')}</p>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <p>{t('paviso38')}<b>{t('paviso39')}</b></p>
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso40')}<b>{t('paviso41')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso42')}<b>{t('paviso43')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso44')}<b>{t('paviso45')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso46')}<b>{t('paviso47')}</b>{t('paviso48')}</p>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="list-group-item">
                                                            <p>{t('paviso49')}<b>{t('paviso50')}</b></p>
                                                            <ul className="list-group">
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso51')}<b>{t('paviso52')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso53')}<b>{t('paviso54')}</b>{t('paviso55')}<b>{t('paviso56')}</b>{t('paviso57')}<b>{t('paviso58')}</b>{t('paviso59')}<b>{t('paviso60')}</b></p>
                                                                </li>
                                                                <li className="list-group-item">
                                                                    <p>{t('paviso61')}<b>{t('paviso62')}</b>{t('paviso63')}<b>{t('paviso64')}</b>{t('paviso65')}<b>{t('paviso66')}</b></p>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                    <p>{t('paviso67')}</p>
                                                    <p>{t('paviso68')}</p>
                                                </li>
                                            </ul>
                                            <h5>{t('h5aviso14')}</h5>
                                            <p>{t('paviso69')}</p>
                                            <h5>{t('h5aviso15')}</h5>
                                            <p>{t('paviso70')}</p>
                                            <p>{t('paviso71')}</p>
                                            <p>{t('paviso72')}</p>
                                            <b><p>{t('paviso73')}</p></b>
                                            <p>{t('paviso74')}</p>
                                            <h5>{t('h5aviso16')}</h5>
                                            <p>{t('paviso75')}</p>
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
