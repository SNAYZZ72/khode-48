import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCompany from '../../common/Header/HeaderCompany';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { auth } from '../../firebase';
import { firestore } from '../../firebase';

const ProfileCompany = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [companyImage, setCompanyImage] = useState(null);

    //test
    const [companyFormErrors, setCompanyFormErrors] = useState({
        companyName: false,
        city: false,
        industry: false,
        maturity: false,
        primarySector: false,
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

    const [selectedCompanyImage, setSelectedCompanyImage] = useState(null);

    const [projectList, setProjectList] = useState([
    ]);

    const [challengeList, setChallengeList] = useState([
    ]);

    const [companyFormData, setCompanyFormData] = useState({
        companyName: '',
        city: '',
        industry: '',
        maturity: '',
        primarySector: '',
        linkedinPage: '',
        twitterPage: '',
        facebookPage: '',
        contactFirstName: '',
        contactLastName: '',
        contactRole: '',
        phoneNumber: '',
        email: '',
        information: '',
    });

    const authStateChangedExecuted = useRef(false);

    useEffect(() => {
        const handleAuthStateChanged = async (user) => {
            if (user) {
                const userId = user.uid;

                try {
                    const userDocRef = firestore.collection('users').doc('userscompany');
                    const userDoc = await userDocRef.get();

                    if (userDoc.exists) {
                        const userData = userDoc.data()[userId];

                        setCompanyFormData({
                            companyName: userData.companyName,
                            city: userData.city,
                            email: userData.email,
                            postalCode: userData.postalCode,
                            phoneNumber: userData.phoneNumber,
                            industry: userData.industry,
                            maturity: userData.maturity,
                            primarySector: userData.primarySector,
                            linkedinPage: userData.linkedinPage,
                            twitterPage: userData.twitterPage,
                            facebookPage: userData.facebookPage,
                            contactFirstName: userData.contactFirstName,
                            contactLastName: userData.contactLastName,
                            contactRole: userData.contactRole,
                            information: userData.information,
                        });
                        console.log('User data retrieved');
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
            setSelectedCompanyImage(e.target.result);
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
            const userDocRef = firestore.collection('users').doc('userscompany');
            const userDoc = await userDocRef.get();
            const userData = userDoc.data()[userId];
            await userDocRef.update({

                [userId]: {
                    companyName: userData.companyName,
                    city: companyFormData.city,
                    postalCode: companyFormData.postalCode,
                    information: companyFormData.information,
                    phoneNumber: userData.phoneNumber,
                    email: userData.email,
                    industry: userData.industry,
                    maturity: userData.maturity,
                    primarySector: userData.primarySector,
                    linkedinPage: userData.linkedinPage,
                    twitterPage: userData.twitterPage,
                    facebookPage: userData.facebookPage,
                    contactFirstName: userData.contactFirstName,
                    contactLastName: userData.contactLastName,
                    contactRole: userData.contactRole,

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
        setCompanyFormData((prevCompanyFormData) => ({
            ...prevCompanyFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <HeaderCompany />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{companyFormData.companyName}</h1>
            </div>

            {isEditing ? (
                <div className="container">
                    <h2>{t('edit')}</h2>
                    <form>
                        <div className="row mb-3">
                            <div className="col">
                                <label>{t('city')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={companyFormData.city}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.city && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}

                            </div>
                            <div className="col">
                                <label>{t('postalCode')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={companyFormData.postalCode}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.postalCode && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="aboutme">{t('aboutCompany')}</label>
                                <textarea
                                    className="form-control"
                                    id="information"
                                    name="information"
                                    value={companyFormData.information}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.information && (
                                    <div className="invalid-feedback">About me field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label>{t('contactFirstName')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="contactFirstName"
                                    name="contactFirstName"
                                    value={companyFormData.contactFirstName}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.contactFirstName && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                            <div className="col">
                                <label>{t('contactLastName')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="contactLastName"
                                    name="contactLastName"
                                    value={companyFormData.contactLastName}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.contactLastName && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                            <div className="col">
                                <label>{t('contactRole')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="contactRole"
                                    name="contactRole"
                                    value={companyFormData.contactRole}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.contactRole && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label>{t('phoneNumber')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={companyFormData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.phoneNumber && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label>{t('mainSector')}</label>
                                <select
                                    className="form-select"
                                    id="industry"
                                    name="industry"
                                    value={companyFormData.industry}
                                    onChange={handleInputChange}
                                >
                                    <option value={companyFormData.industry}>{companyFormData.industry}</option>
                                    <option value="Digital">{t('Digital')}</option>
                                    <option value="Industry">{t('Industry')}</option>
                                    <option value="Social and Solidarity Economy">{t('Social and Solidarity Economy')}</option>
                                    <option value="Cultural and Creative Industry">{t('Cultural and Creative Industry')}</option>
                                </select>
                                {companyFormErrors.industry && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                            <div className="col">
                                <label>{t('maturityProject')}</label>
                                <select
                                    className="form-select"
                                    id="maturity"
                                    name="maturity"
                                    value={companyFormData.maturity}
                                    onChange={handleInputChange}
                                >
                                    <option value={companyFormData.maturity}>{companyFormData.maturity}</option>
                                    <option value="Ideation">{t('Ideation')}</option>
                                    <option value="Minimum Viable Product">{t('Minimum Viable Product')}</option>
                                    <option value="First Customer / First Users">{t('First Customer / First Users')}</option>
                                    <option value="Commercialization">{t('Commercialization')}</option>
                                    <option value="International">{t('International')}</option>
                                </select>
                                {companyFormErrors.maturity && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                            <div className="col">
                                <label>{t('primarySector')}</label>
                                <select
                                    className="form-select"
                                    id="primarySector"
                                    name="primarySector"
                                    value={companyFormData.primarySector}
                                    onChange={handleInputChange}
                                >
                                    <option value={companyFormData.primarySector}>{companyFormData.primarySector}</option>
                                    <option value="Banking / Insurance">{t('Banking / Insurance')}</option>
                                    <option value="Construction">{t('Construction')}</option>
                                    <option value="Chemical">{t('Chemical')}</option>
                                    <option value="Medical Devices">{t('Medical Devices')}</option>
                                    <option value="Biotechnology">{t('Biotechnology')}</option>
                                    <option value="Commerce / Distribution">{t('Commerce / Distribution')}</option>
                                    <option value="Event / Communication">{t('Event / Communication')}</option>
                                    <option value="Pharmaceutical Industry">{t('Pharmaceutical Industry')}</option>
                                    <option value="IT / Telecommunications">{t('IT / Telecommunications')}</option>
                                    <option value="Textile / Clothing">{t('Textile / Clothing')}</option>
                                    <option value="Transportation / Logistics">{t('Transportation / Logistics')}</option>
                                    <option value="Sports and Leisure">{t('Sports and Leisure')}</option>
                                    <option value="Tourism / Catering">{t('Tourism / Catering')}</option>
                                    <option value="e-Health and Well-being">{t('e-Health and Well-being')}</option>
                                    <option value="Education / Training">{t('Education / Training')}</option>
                                    <option value="Energy">{t('Energy')}</option>
                                    <option value="Legal">{t('Legal')}</option>
                                    <option value="Digital Industry">{t('Digital Industry')}</option>
                                    <option value="Business Services">{t('Business Services')}</option>
                                </select>
                                {companyFormErrors.maturity && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label>{t('profilepicture')}</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="companyImage"
                                    name="companyImage"
                                    accept="companyImage/*"
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
                        <div className="col-md-3 text-center">
                            <img
                                src={selectedCompanyImage || companyImage || '../company-profile-image.png'}
                                alt="Profile"
                                style={{ width: '15vw', height: 'auto' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('city')} / {t('postalCode')}</h4>
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {companyFormData.city} / {companyFormData.postalCode}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h4>{t('aboutCompany')}</h4>
                                    <p
                                        style={{
                                            border: "3px solid #F24726",
                                            padding: '5px',
                                            borderRadius: '10px',
                                            height: '100px',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        {companyFormData.information}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('Contact')}</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item"><b>{t('firstName')}:</b> {companyFormData.contactFirstName} {companyFormData.contactLastName}</li>
                                        <li className="list-group-item"><b>{t('position')}:</b> {companyFormData.contactRole}</li>
                                        <li className="list-group-item"><b>{t('email')}:</b> {companyFormData.email}</li>
                                        <li className="list-group-item"><b>{t('phoneNumber')}:</b> {companyFormData.phoneNumber}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('company')}</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item"><b>{t('mainSector')}:</b> {companyFormData.industry}</li>
                                        <li className="list-group-item"><b>{t('primarySector')}:</b> {companyFormData.primarySector}</li>
                                        <li className="list-group-item"><b>{t('maturityProject')}:</b> {companyFormData.maturity}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('socialMedia')}</h4>
                                    <Nav className="align-items-center" style={{ marginTop: "-10px", marginLeft: "-15px" }}>
                                        {/* Contenu de la dernière colonne */}
                                        <Nav.Link href="https://twitter.com" target="_blank" style={{ color: '#F24726', fontSize: '40px' }}>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.facebook.com" target="_b    lank" style={{ color: '#F24726', fontSize: '40px' }}>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.instagram.com" target="_blank" style={{ color: '#F24726', fontSize: '40px' }}>
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

export default ProfileCompany;
