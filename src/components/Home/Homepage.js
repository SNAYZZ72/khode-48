import React, { useState } from 'react';
import { Nav, Navbar, Button, Container, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header/Header';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 

const Home = () => {
    const { t } = useTranslation();
    const [profileType, setProfileType] = useState('');
    const [studentCount, setStudentCount] = useState(345);
    const [companyCount, setCompanyCount] = useState(15);
    const [intermediaryCount, setIntermediaryCount] = useState(200);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false); // New state to track login process

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleProfileSelect = (type) => {
        setProfileType(type);
    };

    const handleLoginDisplay = () => {
        setShowLoginModal(true);
    };

    const handleLogin = (e) => {
        setIsLoggingIn(true); // Set isLoggingIn to true when login starts
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            console.log('user is signed in: ', user);
            navigate('/HomeYouth')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.log('user is not signed in');
        });
        setIsLoggingIn(false); // Set isLoggingIn to false when login finishes
        handleCloseModal(); // Close the modal
    };

    const handleCloseModal = () => {
        if (!isLoggingIn) { // Only close the modal if not currently logging in
            setShowLoginModal(false);
        }
    };

    return (
        <div className="Home">
            <Header />

            <Container>
                <div className="text-center" style={{ paddingBottom: '15px' }}>
                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <div className="mb-4">
                            <h1 style={{ fontWeight: 'bold' }}>{studentCount}</h1>
                            <h3>{t('youngPeople')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                        <div className="mb-4">
                            <h1 style={{ fontWeight: 'bold' }}>{companyCount}</h1>
                            <h3>{t('companies')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                        <div className="mb-4">
                            <h1 style={{ fontWeight: 'bold' }}>{intermediaryCount}</h1>
                            <h3>{t('intermediaries')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container>
                <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>{t('titleprofile')}</h2>
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
                                borderRadius: '15px',
                                padding: '10px',
                            }}
                        >
                            <div><img src="../young-profile-image.png" alt="Young Profile" style={{ width: '80px', height: '80px' }} /></div>
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
                                borderRadius: '15px',
                                padding: '10px',
                            }}
                        >
                            <div><img src="../company-profile-image.png" alt="Company Profile" style={{ width: '80px', height: '80px' }} /></div>
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
                                borderRadius: '15px',
                                padding: '10px',
                            }}
                        >
                            <div><img src="../intermediary-profile-image.png" alt="Intermediary Profile" style={{ width: '80px', height: '80px' }} /></div>
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
                        <Button variant="primary" onClick={handleLoginDisplay} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('login')}
                        </Button>
                    </div>
                )}

                {profileType === 'company' && (
                    <div className="container text-center">
                        <h2>{t('companyProfile')}</h2>
                        <p>{t('companyProfileDescription')}</p>
                        <Button variant="primary" onClick={handleLoginDisplay} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('login')}
                        </Button>
                    </div>
                )}

                {profileType === 'intermediary' && (
                    <div className="container text-center">
                        <h2>{t('intermediaryProfile')}</h2>
                        <p>{t('intermediaryProfileDescription')}</p>
                        <Button variant="primary" onClick={handleLoginDisplay} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
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
                    <div>
                        <div className="form-group">
                            <label htmlFor="email">{t('email')}</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />                       
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="password">{t('password')}</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />                        
                        </div>
                        <br />
                        <Button
                            variant="primary"
                            type="submit"
                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                            onClick={handleLogin}
                        >
                        {t('login')}
                        </Button>
                    </div>

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
