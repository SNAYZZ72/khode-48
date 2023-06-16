import React, { useState } from 'react';
import { Nav, Navbar, Button, Container, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const Home = () => {
    const { t } = useTranslation();
    const [profileType, setProfileType] = useState('');
    const [studentCount, setStudentCount] = useState(345);
    const [companyCount, setCompanyCount] = useState(15);
    const [intermediaryCount, setIntermediaryCount] = useState(200);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleProfileSelect = (type) => {
        setProfileType(type);
    };

    const handleLogin = () => {
        console.log('Logged in as', profileType);
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    return (
        <div className="Home">
            <Header />

            <Container>
                <div className="text-center" style={{ paddingTop: '15px' }}>
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <div className="mb-4">
                            <h1 style={{ fontWeight: 'bold' }}>{studentCount}</h1>
                            <h3>{t('youngPeople')}</h3>
                            <p>{t('loremIpsum')}</p>
                        </div>
                        <div className="mb-4">
                            <h1 style={{ fontWeight: 'bold' }}>{companyCount}</h1>
                            <h3>{t('companies')}</h3>
                            <p>{t('loremIpsum')}</p>
                        </div>
                        <div className="mb-4">
                            <h1 style={{ fontWeight: 'bold' }}>{intermediaryCount}</h1>
                            <h3>{t('intermediaries')}</h3>
                            <p>{t('loremIpsum')}</p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container>
                <h2 style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '15px' }}>{t('titleprofile')}</h2>
                <Navbar>
                    <Nav className="w-100 d-flex flex-wrap justify-content-center">
                        <Nav.Link
                            onClick={() => handleProfileSelect('young')}
                            active={profileType === 'young'}
                            className="text-center d-flex flex-column align-items-center mb-3"
                            style={{
                                fontWeight: 'bold',
                                color: '#F24726',
                                border: profileType === 'young' ? '4px solid #F24726' : 'none',
                                borderRadius: '15px',
                                padding: '10px',
                            }}
                        >
                            <img src="../young-profile-image.png" alt="Young Profile" style={{ width: '80px', height: '80px' }} />
                            <div>{t('young')}</div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => handleProfileSelect('company')}
                            active={profileType === 'company'}
                            className="text-center d-flex flex-column align-items-center mb-3"
                            style={{
                                fontWeight: 'bold',
                                color: '#F24726',
                                border: profileType === 'company' ? '4px solid #F24726' : 'none',
                                borderRadius: '15px',
                                padding: '10px',
                            }}
                        >
                            <img src="../company-profile-image.png" alt="Company Profile" style={{ width: '80px', height: '80px' }} />
                            <div>{t('company')}</div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => handleProfileSelect('intermediary')}
                            active={profileType === 'intermediary'}
                            className="text-center d-flex flex-column align-items-center mb-3"
                            style={{
                                fontWeight: 'bold',
                                color: '#F24726',
                                border: profileType === 'intermediary' ? '4px solid #F24726' : 'none',
                                borderRadius: '15px',
                                padding: '10px',
                            }}
                        >
                            <img src="../intermediary-profile-image.png" alt="Intermediary Profile" style={{ width: '80px', height: '80px' }} />
                            <div>{t('intermediary')}</div>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </Container>

            <Container>
                {profileType === 'young' && (
                    <div className="container text-center">
                        <h2>{t('youthProfile')}</h2>
                        <p>{t('youthProfileDescription')}</p>
                        <Button variant="primary" onClick={handleLogin} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('login')}
                        </Button>
                    </div>
                )}

                {profileType === 'company' && (
                    <div className="container text-center">
                        <h2>{t('companyProfile')}</h2>
                        <p>{t('companyProfileDescription')}</p>
                        <Button variant="primary" onClick={handleLogin} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('login')}
                        </Button>
                    </div>
                )}

                {profileType === 'intermediary' && (
                    <div className="container text-center">
                        <h2>{t('intermediaryProfile')}</h2>
                        <p>{t('intermediaryProfileDescription')}</p>
                        <Button variant="primary" onClick={handleLogin} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('login')}
                        </Button>
                    </div>
                )}
            </Container>

            <Modal show={showLoginModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('login')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">{t('email')}</label>
                            <input type="email" className="form-control" id="email" placeholder={t('enterEmail')} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="password">{t('password')}</label>
                            <input type="password" className="form-control" id="password" placeholder={t('enterPassword')} />
                        </div>
                        <br />
                        <Button variant="primary" type="submit" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('submit')}
                        </Button>
                    </form>

                    {profileType === 'young' && (
                        <p>
                            {t('dontHaveYoungAccount')}{' '}
                            <a href="/registery" style={{ color: '#F24726' }}>
                                {t('createYoungAccount')}
                            </a>
                        </p>
                    )}
                    {profileType === 'company' && (
                        <p>
                            {t('dontHaveCompanyAccount')}{' '}
                            <a href="/registerC" style={{ color: '#F24726' }}>
                                {t('createCompanyAccount')}
                            </a>
                        </p>
                    )}
                    {profileType === 'intermediary' && (
                        <p>
                            {t('dontHaveIntermediaryAccount')}{' '}
                            <a href="/registerI" style={{ color: '#F24726' }}>
                                {t('createIntermediaryAccount')}
                            </a>
                        </p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Home;
