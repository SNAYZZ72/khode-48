import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../../common/Header/HeaderIntermediary';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { firestore } from '../../firebase';
import { auth } from '../../firebase';


const ProfileIntermediary = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [intermediaryImage, setIntermediaryImage] = useState(null);

    //test
    const [intermediaryFormErrors, setIntermediaryFormErrors] = useState({
        //intermediaryName risk
        companyName: false,
        city: false,
        industry: false,
        maturity: false,
        // primarySector: false,
        linkedinPage: false,
        twitterPage: false,
        facebookPage: false,
        contactFirstName: false,
        contactLastName: false,
        contactRole: false,
        phoneNumber: false,
        email: false,
        information: false,
    });

    const [selectedIntermediaryImage, setSelectedIntermediaryImage] = useState(null);

    const [intermediaryFormData, setIntermediaryFormData] = useState({
        // intermediaryName: 'Googaz',
        email: '',
        companyName: '',
        contactFirstName: '',
        contactLastName: '',
        contactRole: '',
        information: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
        industry: '',
        maturity: '',
        // primarySector: '',
        linkedinPage: '',
        twitterPage: '',
        facebookPage: '',
    });

    const authStateChangedExecuted = useRef(false);

    useEffect(() => {
        const handleAuthStateChanged = async (user) => {
            if (user) {
                const userId = user.uid;

                try {
                    const userDocRef = firestore.collection('users').doc('usersintermediary');
                    const userDoc = await userDocRef.get();

                    if (userDoc.exists) {
                        const userData = userDoc.data()[userId];

                        setIntermediaryFormData({
                            email: userData.email,
                            companyName: userData.companyName,
                            contactFirstName: userData.contactFirstName,
                            contactLastName: userData.contactLastName,
                            contactRole: userData.contactRole,
                            information: userData.information,
                            city: userData.city,
                            postalCode: userData.postalCode,
                            phoneNumber: userData.phoneNumber,
                            industry: userData.industry,
                            maturity: userData.maturity,
                            // primarySector: userData.primarySector,
                            linkedinPage: userData.linkedinPage,
                            twitterPage: userData.twitterPage,
                            facebookPage: userData.facebookPage,
                        });
                        console.log('User data retrieved');
                        console.log(userData.contactLastName);
                    } else {
                        console.log('User document not found');
                    }
                } catch (error) {
                    console.log('Error retrieving user data:', error);
                }
            } else {
                console.log('User is not signed in');
            }
        };

        // Attach the event listener only if it hasn't been executed before
        if (!authStateChangedExecuted.current) {
            auth.onAuthStateChanged(handleAuthStateChanged);
            authStateChangedExecuted.current = true;
        }

    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedIntermediaryImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    //function to get user uid
    const getUserUid = () => {
        const user = auth.currentUser;
        if (user) {
            return user.uid;
        } else {
            return null;
        }
    };

    const handleSaveProfile = async (user) => {
        setIsEditing(false);
        const userId = getUserUid()

        try {

            // Update the user's information in Firestore
            const userDocRef = firestore.collection('users').doc('usersintermediary');
            const userDoc = await userDocRef.get();
            const userData = userDoc.data()[userId];
            await userDocRef.update({

                [userId]: {
                    email: userData.email,
                    companyName: userData.companyName,
                    contactFirstName: userData.contactFirstName,
                    contactLastName: userData.contactLastName,
                    contactRole: userData.contactRole,
                    information: intermediaryFormData.information,
                    city: intermediaryFormData.city,
                    postalCode: intermediaryFormData.postalCode,
                    phoneNumber: userData.phoneNumber,
                    industry: userData.industry,
                    maturity: userData.maturity,
                    // primarySector: userData.primarySector,
                    linkedinPage: userData.linkedinPage,
                    twitterPage: userData.twitterPage,
                    facebookPage: userData.facebookPage,

                    // Add any other fields you want to update
                }
            });
            console.log('User data updated');
        } catch (error) {
            console.log('Error updating user data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIntermediaryFormData((prevIntermediaryFormData) => ({
            ...prevIntermediaryFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <HeaderIntermediary />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{intermediaryFormData.companyName}</h1>
            </div>

            {isEditing ? (
                <div className="container">
                    <h2>{t('edit')}</h2>
                    <form>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="city">{t('city')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={intermediaryFormData.city}
                                    onChange={handleInputChange}
                                />
                                {intermediaryFormErrors.city && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="aboutme">About me</label>
                                <textarea
                                    className="form-control"
                                    id="information"
                                    name="information"
                                    value={intermediaryFormData.information}
                                    onChange={handleInputChange}
                                />
                                {intermediaryFormErrors.information && (
                                    <div className="invalid-feedback">About me field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label>Profile picture</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="intermediaryImage"
                                    name="intermediaryImage"
                                    accept="intermediaryImage/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                onClick={handleSaveProfile}
                                className="btn btn-primary"
                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                            >
                                {t('registerButton')}
                            </button>
                        </div>
                    </form>
                </div >

            ) : (

                <div className="container">
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-2 text-center">
                            <img
                                src={selectedIntermediaryImage || intermediaryImage || '../intermediary-profile-image.png'}
                                alt="Profile"
                                style={{ width: '90%', height: 'auto', marginBottom: '15px' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('city')}: {intermediaryFormData.city}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p
                                        style={{
                                            border: "3px solid #F24726",
                                            padding: '5px',
                                            borderRadius: '10px',
                                            height: '140px',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        {intermediaryFormData.information}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col">
                                    <h3>{t('socialMedia')}</h3>
                                    <Nav className="align-items-center" style={{ marginTop: "-15px", marginLeft: "-15px" }}>
                                        {/* Contenu de la dernière colonne */}
                                        <Nav.Link href="https://twitter.com" target="_blank" style={{ color: '#F24726', fontSize: '30px' }}>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.facebook.com" target="_b    lank" style={{ color: '#F24726', fontSize: '30px' }}>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.instagram.com" target="_blank" style={{ color: '#F24726', fontSize: '30px' }}>
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Nav.Link>
                                    </Nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={handleEditProfile}
                            className="btn btn-primary"
                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                        >
                            {t('edit')}
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ProfileIntermediary;
