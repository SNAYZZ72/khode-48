import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../common/Header/Header';
import zxcvbn from 'zxcvbn';
import { Modal, Button } from 'react-bootstrap';
import { auth } from '../../firebase';
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

const RegisterPage = () => {
    const { t } = useTranslation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [error, setError] = useState('');
    const [existEmail, setExistEmail] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        city: '',
        postalCode: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        educationalLevel: '',
        information: '',
    });

    const handleRegister = async () => {
        try {
            await auth.createUserWithEmailAndPassword(formData.email, formData.password);
            setExistEmail(false);
            // Wait for the user to be authenticated and logged in
            await auth.signInWithEmailAndPassword(formData.email, formData.password);

            // Set the user data
            const sentData = {
                firstName: formData.firstName || '',
                lastName: formData.lastName || '',
                gender: formData.gender || '',
                dateOfBirth: formData.dateOfBirth || '',
                city: formData.city || '',
                postalCode: formData.postalCode || '',
                email: formData.email || '',
                phoneNumber: formData.phoneNumber || '',
                educationalLevel: formData.educationalLevel || '',
                information: formData.information || '',
                listExperience: [],
                listLanguages: [],
                proactivity: 0,
                creativity: 0,
                initiative: 0,
                empathy: 0,
                leadership: 0,
                teamwork: 0,
            };
            // Get the user ID of the newly created user
            const userId = auth.currentUser.uid;

            // Get a reference to the parent document
            const parentDocRef = firestore.collection('users').doc('usersyouth');

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
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [passwordValid, setPasswordValid] = useState(true);
    const navigate = useNavigate();

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
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form submission logic here
        const currentDate = new Date();
        const selectedDate = new Date(formData.dateOfBirth);
        const minimumAge = 8; // Minimum age in years

        selectedDate.setFullYear(selectedDate.getFullYear() + minimumAge);

        if (selectedDate >= currentDate) {
            // Date of birth does not meet the minimum age requirement, show an error message or take appropriate action
            setShowErrorModal(true);
            return;
        }

        if (formData.password === formData.confirmPassword && validatePassword(formData.password)) {
            // Passwords match and meet the requirements
            setPasswordsMatch(true);
            // Rest of your code...
        } else {
            // Passwords don't match or don't meet the requirements, show an error message or take appropriate action
            setPasswordsMatch(false);
        }

        // You can send the form data to a backend server or perform any other actions
        // if handleREgister return no error then result is true and the following code can execute

        if (doesPasswordMatch() && validatePassword(formData.password)) {
            const result = await handleRegister();

            if (result) {
                setExistEmail(false);

                setShowSuccessModal(true);

                // Reset form fields after submission if needed
                setFormData({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    dateOfBirth: '',
                    city: '',
                    postalCode: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phoneNumber: '',
                    educationalLevel: '',
                    information: '',
                });
                setTimeout(() => {
                    navigate('/');
                }, 2500);
                return true;
            } else {
                return false;
            }
        }
    };


    const handleModalClose = () => {
        setShowErrorModal(false);
        setShowSuccessModal(false); // Close the success modal
    };

    return (
        <div>
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{t('Young People Register')}</h1>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} style={{ paddingBottom: '15px' }}>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('firstName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>{t('lastName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('gender')}</label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">{t('selectGender')}</option>
                                <option value="female">{t('female')}</option>
                                <option value="male">{t('male')}</option>
                                <option value="nonBinary">{t('nonBinary')}</option>
                                <option value="preferNotToSay">{t('preferNotToSay')}</option>
                            </select>
                        </div>
                        <div className="col">
                            <label>{t('dateOfBirth')}</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('city')}</label>
                            <input
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            >
                            </input>
                        </div>
                        <div className="col">
                            <label>{t('postalCode')}</label>
                            <input
                                className="form-control"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                required
                            >
                            </input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('email')}</label>
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
                        <div className="col">
                            <label>{t('phoneNumber')}</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('password')}</label>
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
                            {!validatePassword(formData.password) && (
                                <p className="text-danger">
                                    {t('errorPassword')}
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
                            <label htmlFor="educationalLevel">{t('educationalLevel')}</label>
                            <select
                                className="form-control"
                                id="educationalLevel"
                                name="educationalLevel"
                                value={formData.educationalLevel}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">{t('selectEducationalLevel')}</option>
                                <option value="highSchool">{t('highSchool')}</option>
                                <option value="bachelorsDegree">{t('bachelorsDegree')}</option>
                                <option value="mastersDegree">{t('mastersDegree')}</option>
                                <option value="doctoralDegree">{t('doctoralDegree')}</option>
                                <option value="other">{t('other')}</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="col">
                            <label htmlFor="information">{t('information')}</label>
                            <textarea
                                className="form-control"
                                id="information"
                                name="information"
                                value={formData.information}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="container text-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                        >
                            {t('registerButton')}
                        </button>
                    </div>
                </form>
            </div>
            <Modal show={showErrorModal} onHide={handleModalClose}>
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
            </Modal>
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

export default RegisterPage;

