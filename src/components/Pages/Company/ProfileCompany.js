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
    const [studentCount, setStudentCount] = useState(5);
    const [challengeCount, setChallengeCount] = useState(7);

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
        aboutme: false
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
    });

    const authStateChangedExecuted = useRef(false);

    useEffect(() => {
        // const storedCompanyFormData = localStorage.getItem('companyFormData');
        // if (storedCompanyFormData) {
        //     setCompanyFormData(JSON.parse(storedCompanyFormData));
        // }

        // const storedProjectList = localStorage.getItem('projectList');
        // if (storedProjectList) {
        //     setProjectList(JSON.parse(storedProjectList));
        // }

        // const storedChallengeList = localStorage.getItem('challengeList');
        // if (storedChallengeList) {
        //     setChallengeList(JSON.parse(storedChallengeList));
        // }

        // const storedCompanyImage = localStorage.getItem('companyImage');
        // if (storedCompanyImage) {
        //     setSelectedCompanyImage(JSON.parse(storedCompanyImage));
        // }
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
                            contactLastName: userData.contactLasttName,
                            contactRole: userData.contactRole,
                        });
                        console.log('User data retrieved');
                        console.log(userData.contactFirstName);
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
        // // Vérifier si les champs requis sont remplis
        // if (!companyFormData.city || !companyFormData.aboutme || !projectList.length || !challengeList.length) {
        //     alert('Please fill in all the required fields to enable your profile.');
        //     return;
        // }

        // // Réinitialiser les erreurs de formulaire
        // setCompanyFormErrors({
        //     city: false,
        //     aboutme: false,
        //     project: false,
        //     challenge: false
        // });

        // // Effectuer la logique de sauvegarde du profil
        // setIsEditing(false);

        // // Envoyer les données au serveur ou effectuer d'autres actions nécessaires
        // localStorage.setItem('companyFormData', JSON.stringify(companyFormData));
        // localStorage.setItem('projectList', JSON.stringify(projectList));
        // localStorage.setItem('challengeList', JSON.stringify(challengeList));
        // localStorage.setItem('companyImage', JSON.stringify(selectedCompanyImage));
        // Effectuer la logique de sauvegarde du profil
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


    const handleProjectChange = (index, value) => {
        setProjectList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleChallengeChange = (index, value) => {
        setChallengeList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleAddProject = () => {
        const newProjectList = [...projectList, ''];
        setProjectList(newProjectList);
        localStorage.setItem('projectList', JSON.stringify(newProjectList));
    };

    const handleRemoveProject = (index) => {
        const newProjectList = projectList.filter((_, i) => i !== index);
        setProjectList(newProjectList);
        localStorage.setItem('projectList', JSON.stringify(newProjectList));
    };

    const handleAddChallenge = () => {
        const newChallengeList = [...challengeList, ''];
        setChallengeList(newChallengeList);
        localStorage.setItem('challengeList', JSON.stringify(newChallengeList));
    };

    const handleRemoveChallenge = (index) => {
        const newChallengeList = challengeList.filter((_, i) => i !== index);
        setChallengeList(newChallengeList);
        localStorage.setItem('challengeList', JSON.stringify(newChallengeList));
    };

    const handleToggle = () => {
        setHideProfile(!hideProfile);
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
                                <label htmlFor="city">{t('city')}</label>
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
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="aboutme">About me</label>
                                <textarea
                                    className="form-control"
                                    id="aboutme"
                                    name="aboutme"
                                    value={companyFormData.aboutme}
                                    onChange={handleInputChange}
                                />
                                {companyFormErrors.aboutme && (
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
                        <div className="col-md-2 text-center">
                            <img
                                src={selectedCompanyImage || companyImage || '../intermediary-profile-image.png'}
                                alt="Profile"
                                style={{ width: '90%', height: 'auto', marginBottom: '15px' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('city')}: {companyFormData.city}
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
                                        {companyFormData.aboutme}
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

export default ProfileCompany;
