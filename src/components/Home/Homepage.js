import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button, Container, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header/Header';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { firestore } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { MapContainer, TileLayer } from 'react-leaflet';

const Home = () => {
    const { t } = useTranslation();
    const [profileType, setProfileType] = useState('');
    const [studentCount, setStudentCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [intermediaryCount, setIntermediaryCount] = useState(0);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false); // New state to track login process

    const { dispatch } = useContext(AuthContext)
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

    // Fetch user counts from the database
    const fetchUserCounts = async () => {
        const usersCompanyRef = firestore.collection('users').doc('userscompany');
        const usersIntermediaryRef = firestore.collection('users').doc('usersintermediary');
        const usersYouthRef = firestore.collection('users').doc('usersyouth');

        const usersCompanySnapshot = await usersCompanyRef.get();
        const usersIntermediarySnapshot = await usersIntermediaryRef.get();
        const usersYouthSnapshot = await usersYouthRef.get();

        const usersCompanyData = usersCompanySnapshot.data();
        const usersIntermediaryData = usersIntermediarySnapshot.data();
        const usersYouthData = usersYouthSnapshot.data();

        const studentCount = usersYouthData ? Object.keys(usersYouthData).length : 0;
        const companyCount = usersCompanyData ? Object.keys(usersCompanyData).length : 0;
        const intermediaryCount = usersIntermediaryData ? Object.keys(usersIntermediaryData).length : 0;

        setStudentCount(studentCount);
        setCompanyCount(companyCount);
        setIntermediaryCount(intermediaryCount);
    };



    useEffect(() => {
        fetchUserCounts();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true); // Set isLoggingIn to true when login starts
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: user })
                if (profileType === 'young') {
                    navigate('/homeYouth');
                }
                if (profileType === 'company') {
                    navigate('/homeCompany');
                }
                if (profileType === 'intermediary') {
                    navigate('/homeIntermediary');
                }
                //login successful
            })
            .catch((error) => {
                alert('Wrong email or password');
                //login failed
            });
        setIsLoggingIn(false); // Set isLoggingIn to false when login finishes
        handleCloseModal(); // Close the modal
    };

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const userId = user.uid;

            try {
                const userDocRef = firestore.collection('users').doc('usersyouth');
                const userDoc = await userDocRef.get();

                if (userDoc.exists) {
                    const userData = userDoc.data()[userId];
                } else {
                    console.log('User document not found');
                }
            } catch (error) {
                console.log('Error retrieving user data:', error);
            }
        } else {
            console.log('User is not signed in');
        }
    });

    const handleCloseModal = () => {
        if (!isLoggingIn) { // Only close the modal if not currently logging in
            setShowLoginModal(false);
        }
    };

    const customTileLayer = (
        <TileLayer
            url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
    );

    return (
        <div className="Home">
            <Header />
            <div style={{ height: '250px' }}>
                <MapContainer
                    center={[43.25, -2.93]}
                    zoom={10}
                    style={{ height: '100%', width: '100%' }}
                >
                    {customTileLayer}
                    {/* Ajoutez d'autres composants Leaflet pour afficher des marqueurs, des formes géométriques, etc. */}
                </MapContainer>
            </div>
            <Container>
                <div className="text-center" style={{ paddingTop: '15px' }}>
                    <div className="row mb-3 text-center">
                        <div className="col-md-4" style={{ paddingBottom: '15px' }}>
                            <h1 style={{ fontWeight: 'bold' }}>{studentCount}</h1>
                            <h3>{t('youngPeople')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                        <div className="col-md-4" style={{ paddingBottom: '15px' }}>
                            <h1 style={{ fontWeight: 'bold' }}>{companyCount}</h1>
                            <h3>{t('companies')}</h3>
                            <p style={{ maxWidth: '80%', textAlign: 'center', margin: 'auto' }}>{t('loremIpsum')}</p>
                        </div>
                        <div className="col-md-4" style={{ paddingBottom: '15px' }}>
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
                        <div className="col" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                            <div className="row mb-3">
                                <h4>{t('email')}</h4>
                                <input
                                    style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="row mb-3">
                                <h4>{t('password')}</h4>
                                <input
                                    style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center">

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
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                        onClick={handleLogin}
                    >
                        {t('login')}
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;
