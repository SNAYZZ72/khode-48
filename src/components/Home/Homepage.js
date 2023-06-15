import React, { useState } from 'react';
import { Nav, Navbar, Button, Container, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const Home = () => {
    const { t } = useTranslation(); // Initialize the translation hook
    const [profileType, setProfileType] = useState(''); // Default profile: none
    const [studentCount, setStudentCount] = useState(345); // Number of registered students
    const [companyCount, setCompanyCount] = useState(15); // Number of companies
    const [intermediaryCount, setIntermediaryCount] = useState(200); // Number of intermediaries
    const [showLoginModal, setShowLoginModal] = useState(false); // Login modal visibility

    const handleProfileSelect = (type) => {
        setProfileType(type);
    };

    const handleLogin = () => {
        // Login logic based on the selected profile
        console.log('Logged in as', profileType);
        setShowLoginModal(true); // Show the login modal
    };

    const handleCloseModal = () => {
        setShowLoginModal(false); // Close the login modal
    };

    return (
        <div className="Home">
            <Header />

            {/* Labels indicating the number of registered students, companies, and intermediaries */}
            <Container>
                <div className="text-center" style={{ paddingTop: '30px' }}>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="mr-4">
                            <h1 style={{ fontWeight: 'bold' }}>{studentCount}</h1>
                            <h3>{t('youngPeople')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                        <div className="mr-4">
                            <h1 style={{ fontWeight: 'bold' }}>{companyCount}</h1>
                            <h3>{t('companies')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                        <div>
                            <h1 style={{ fontWeight: 'bold' }}>{intermediaryCount}</h1>
                            <h3>{t('intermediaries')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                    </div>
                </div>
            </Container>



            <Container>
                <h1 style={{ fontWeight: 'bold', textAlign: 'center', paddingTop: '30px' }}>{t('titleprofile')}</h1>
                <Navbar>
                    <Nav className="w-100 d-flex">
                        <Nav.Link
                            onClick={() => handleProfileSelect('young')}
                            active={profileType === 'young'}
                            className="w-100 text-center d-grid"
                            style={{
                                fontWeight: 'bold',
                                color: '#F24726',
                                border: profileType === 'young' ? '4px solid #F24726' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '15px',
                            }}
                        >
                            <div>
                                <img src="../young-profile-image.png" alt="Young Profile" style={{ width: '80px', height: '80px' }} />
                            </div>
                            <div>{t('young')}</div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => handleProfileSelect('company')}
                            active={profileType === 'company'}
                            className="w-100 text-center d-grid"
                            style={{
                                fontWeight: 'bold',
                                color: '#F24726',
                                border: profileType === 'company' ? '4px solid #F24726' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '15px',
                            }}
                        >
                            <div>
                                <img src="../company-profile-image.png" alt="Company Profile" style={{ width: '80px', height: '80px' }} />
                            </div>
                            <div>{t('company')}</div>
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => handleProfileSelect('intermediary')}
                            active={profileType === 'intermediary'}
                            className="w-100 text-center d-grid"
                            style={{
                                fontWeight: 'bold',
                                color: '#F24726',
                                border: profileType === 'intermediary' ? '4px solid #F24726' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '15px',
                            }}
                        >
                            <div>
                                <img src="../intermediary-profile-image.png" alt="Intermediary Profile" style={{ width: '80px', height: '80px' }} />
                            </div>
                            <div>{t('intermediary')}</div>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </Container>

            {/* Content of the home page based on the selected profile */}
            <Container>
                {/* Specific content for the selected profile */}
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

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('login')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add your login form or content here */}
                    {/* Example login form */}
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
                            <a href="/signup/intermediary" style={{ color: '#F24726' }}>
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
