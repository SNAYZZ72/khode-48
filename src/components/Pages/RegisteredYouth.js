import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from 'react-google-recaptcha';

// Define the function to determine the color based on password strength score
function getPasswordStrengthColor(score) {
    if (score < 3) {
        return 'danger';
    } else if (score < 4) {
        return 'warning';
    } else {
        return 'success';
    }
}

// Define the function to get the password strength text based on score
function getPasswordStrengthText(score) {
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
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        city: '',
        country: '',
        state: '',
        postalCode: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        educationalLevel: '',
        cvFile: null,
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordScore, setPasswordScore] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            cvFile: file,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        // You can send the form data to a backend server or perform any other actions
        // Reset form fields after submission if needed
        setFormData({
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            address: '',
            city: '',
            country: '',
            state: '',
            postalCode: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            educationalLevel: '',
            cvFile: null,
        });

        if (formData.password === formData.confirmPassword && validatePassword(formData.password)) {
            // Passwords match and meet the requirements
            setPasswordsMatch(true);
            // Rest of your code...
        } else {
            // Passwords don't match or don't meet the requirements, show an error message or take appropriate action
            setPasswordsMatch(false);
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        return regex.test(password);
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
                                <option value="nonBinary">{t('nonBinary')}</option>
                                <option value="preferNotToSay">{t('preferNotToSay')}</option>
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
                        <div className="col-md-6">
                            <label htmlFor="address">{t('address')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="country">{t('country')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-2">
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
                        <div className="col-md-2">
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
                                type="password"
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
                        <div className="col">
                            <label htmlFor="cvFile">{t('uploadCV')}</label>
                            <input
                                type="file"
                                className="form-control"
                                id="cvFile"
                                name="cvFile"
                                onChange={handleFileChange}
                            />
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
                    <div className="">
                        <ReCAPTCHA sitekey="your-recaptcha-sitekey" />
                    </div>
                    <div className="container text-center">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('register')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
