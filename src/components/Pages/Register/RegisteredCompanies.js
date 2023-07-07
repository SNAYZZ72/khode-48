import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../common/Header/Header';
import zxcvbn from 'zxcvbn';
import { Modal, Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { database } from '../../firebase'; // Import the database instance from your firebase.js file
import { firestore } from '../../firebase'; // Import the firestore instance from your firebase.js file

// Define the function to determine the color based on password strength score
const getPasswordStrengthColor = (score) => {
    if (score < 3) {
        return 'danger';
    } else if (score < 4) {
        return 'warning';
    } else {
        return 'success';
    }
}

// Define the function to get the password strength text based on score
const getPasswordStrengthText = (score) => {
    if (score < 3) {
        return 'Weak';
    } else if (score < 4) {
        return 'Moderate';
    } else {
        return 'Strong';
    }
}

const RegisterCompanyPage = () => {
    const { t } = useTranslation();

    const userRef = database.ref('users'); // Reference the 'users' node in the database
    const [error, setError] = useState('');
    const [existEmail, setExistEmail] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        companyName: '',
        commercialName: '',
        city: '',
        postalCode: '',
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
        password: '',
        confirmPass: '',
    });

    const handleRegister = async () => {
        try {
            await auth.createUserWithEmailAndPassword(formData.email, formData.password);
            setExistEmail(false);
            // Wait for the user to be authenticated and logged in
            await auth.signInWithEmailAndPassword(formData.email, formData.password);

            // Set the user data
            const sentData = {
                companyName: formData.companyName,
                commercialName: formData.commercialName,
                city: formData.city,
                postalCode: formData.postalCode,
                industry: formData.industry,
                maturity: formData.maturity,
                primarySector: formData.primarySector,
                linkedinPage: formData.linkedinPage,
                twitterPage: formData.twitterPage,
                facebookPage: formData.facebookPage,
                contactRole: formData.contactRole,
                contactFirstName: formData.contactFirstName,
                contactLastName: formData.contactLastName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
            };
            // Get the user ID of the newly created user
            const userId = auth.currentUser.uid;

            // Get a reference to the parent document
            const parentDocRef = firestore.collection('users').doc('userscompany');

            // Set the user data directly under the parent document
            await parentDocRef.set({ [userId]: sentData }, { merge: true });
            return true;
        } catch (error) {
            setError(error.message);
            alert(error.message);
            setExistEmail(true);
            return false;
        }
    };

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordScore, setPasswordScore] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    // const [showErrorModal, setShowErrorModal] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        const score = zxcvbn(value).score;
        setPasswordScore(score);
        handleInputChange(e);
        setPasswordValid(validatePassword(value) || value.length === 0);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const doesPasswordMatch = () => {
        if (formData.password === formData.confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (regex.test(password)) {
            setError("PPassword must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character.");
            console.log('Invalid');
            return true;
        } else {
            console.log('Valid')
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password === formData.confirmPassword && validatePassword(formData.password)) {
            // Passwords match and meet the requirements
            setPasswordsMatch(true);
            //password validate
        } else {
            // Passwords don't match or don't meet the requirements, show an error message or take appropriate action
            if (!doesPasswordMatch() || !validatePassword(formData.password)) {
                setPasswordsMatch(false);
                return;
            }
        }

        // You can send the form data to a backend server or perform any other actions
        // if handleREgister return no error then result is true and the following code can execute

        if (doesPasswordMatch() && validatePassword(formData.password)) {
            const result = await handleRegister();

            if (result) {
                setExistEmail(false);

                // Show the success modal
                setShowSuccessModal(true);

                // Reset form fields after submission if needed
                setFormData({
                    companyName: '',
                    commercialName: '',
                    city: '',
                    postalCode: '',
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
                    password: '',
                    confirmPass: '',
                });
                return true;
            } else {
                return false;
            }
        }
    };

    const handleModalClose = () => {
        // setShowErrorModal(false);
        setShowSuccessModal(false); // Close the success modal
    };

    return (
        <div>
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{t('CompanyRegister')}</h1>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} style={{ paddingBottom: '15px' }}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="companyName">{t('Company name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="city">{t('city')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="postalCode">{t('postalCode')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="industry">{t('Select your main sector')}</label>
                            <select
                                className="form-control"
                                id="industry"
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">{t('Select')}</option>
                                <option value="Digital">{t('Digital')}</option>
                                <option value="Industry">{t('Industry')}</option>
                                <option value="Social and Solidarity Economy">{t('Social and Solidarity Economy')}</option>
                                <option value="Cultural and Creative Industry">{t('Cultural and Creative Industry')}</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="maturity">{t('What is the maturity of your project?')}</label>
                            <select
                                className="form-control"
                                id="maturity"
                                name="maturity"
                                value={formData.maturity}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">{t('Select')}</option>
                                <option value="Ideation">{t('Ideation')}</option>
                                <option value="Minimum Viable Product">{t('Minimum Viable Product')}</option>
                                <option value="First Customer / First Users">{t('First Customer / First Users')}</option>
                                <option value="Commercialization">{t('Commercialization')}</option>
                                <option value="International">{t('International')}</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="primarySector">{t('Select your primary sector')}</label>
                            <select
                                className="form-control"
                                id="primarySector"
                                name="primarySector"
                                value={formData.primarySector}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">{t('Select')}</option>
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
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="contactFirstName">{t('ContactFirstName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactFirstName"
                                name="contactFirstName"
                                value={formData.contactFirstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="contactLastName">{t('ContactLastName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactLastName"
                                name="contactLastName"
                                value={formData.contactLastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="contactRole">{t('ContactRole')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactRole"
                                name="contactRole"
                                value={formData.contactRole}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="email">{t('email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {existEmail && (
                            <p className="text-danger">
                                {t('emailAlreadyExists')}
                            </p>
                        )}
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="password">{t('password')}</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={toggleShowPassword}
                                    style={{ borderColor: 'rgba(0, 0, 0, 0.125)', backgroundColor: showPassword ? 'rgba(0, 0, 0, 0.125)' : 'white' }}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {passwordScore > 0 && (
                                <p className={`text-${getPasswordStrengthColor(passwordScore)}`}>
                                    {getPasswordStrengthText(passwordScore)}
                                </p>
                            )}
                            {!passwordValid && !validatePassword(formData.password) && formData.password.length > 0 && (
                                <p className="text-danger">
                                    {t('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character.')}
                                </p>
                            )}
                        </div>
                        <div className="col">
                            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                            <input

                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    {!passwordsMatch && (
                        <p className="text-danger">{t('Sorry, an error occurred. The passwords do not match or do not meet the required criteria.')}</p>
                    )}
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="linkedinPage">{t('Companys Linkedin Page')} {t('(optional)')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="linkedinPage"
                                name="linkedinPage"
                                value={formData.linkedinPage}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="twitterPage">{t('Companys Twitter Page')} {t('(optional)')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="twitterPage"
                                name="twitterPage"
                                value={formData.twitterPage}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="facebookPage">{t('Companys Facebook Page')} {t('(optional)')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="facebookPage"
                                name="facebookPage"
                                value={formData.facebookPage}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="container text-center">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('registerButton')}
                        </button>
                    </div>
                </form>
            </div>
            {/* <Modal show={showErrorModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('An error occurred. Please check your input and try again.')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
            <Modal show={showSuccessModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Congratulations!')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('Your account has been successfully created.')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        {t('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegisterCompanyPage;