import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../common/Header/Header';
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from 'react-google-recaptcha';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { database } from '../../firebase'; // Import the database instance from your firebase.js file


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

    const userRef = database.ref('users'); // Reference the 'users' node in the database
    const newUserRef = userRef.push(); // Generate a new unique ID for the user
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
        cities: '', // Store the list of cities
        postalCodes: '', // Store the list of postal codes
    });

    const handleRegister = async () => {
        try {
            await auth.createUserWithEmailAndPassword(formData.email, formData.password);
            setExistEmail(false);
            return true;
        } catch (error) {
            setError(error.message);       
            setExistEmail(true);
            return false;
        }
    };

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordScore, setPasswordScore] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [test, setTest] = useState(false);

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
        if(formData.password === formData.confirmPassword){
            return true;
        }else{
            return false;
        }
    }

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
        
        if(doesPasswordMatch() && validatePassword(formData.password)) {
            const result = await handleRegister();

            if(result) {
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
                };

                console.log(formData.firstName);
                console.log(sentData);

                // Set the user data under the new unique ID
                newUserRef.set(sentData)
                /*
                debbuging
                .then(() => {
                    console.log('User data saved successfully');
                })
                .catch((error) => {
                    console.log('Error saving user data:', error.message);
                });
                */
            
                setExistEmail(false);

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
                });
                return true;
            } else {
                return false;
            }
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return regex.test(password);
    };

    const handleModalClose = () => {
        setShowErrorModal(false);
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
                            <label htmlFor="firstName">{t('firstName')}</label>
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
                            <label htmlFor="lastName">{t('lastName')}</label>
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
                            <label htmlFor="gender">{t('gender')}</label>
                            <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">{t('selectGender')}</option>
                                <option value="female">{t('female')}</option>
                                <option value="male">{t('male')}</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="dateOfBirth">{t('dateOfBirth')}</label>
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
                            <label htmlFor="city">{t('city')}</label>
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
                            <label htmlFor="postalCode">{t('postalCode')}</label>
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
                        <div className="col">
                            <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
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
                            {!validatePassword(formData.password) && (
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
                        <p className="text-danger">{t('passwordsDoNotMatch')}</p>
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
        </div>
    );
};

export default RegisterPage;
