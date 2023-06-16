import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const RegisterPage = () => {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [educationalLevel, setEducationalLevel] = useState('');
    const [cvFile, setCvFile] = useState(null);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const handleDateOfBirthChange = (e) => {
        setDateOfBirth(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleEducationalLevelChange = (e) => {
        setEducationalLevel(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCvFile(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        // You can send the form data to a backend server or perform any other actions
        // Reset form fields after submission if needed
        setFirstName('');
        setLastName('');
        setGender('');
        setDateOfBirth('');
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setEducationalLevel('');
        setCvFile(null);
    };

    return (
        <div>
            <Header />
            <div className="text-center" style={{ paddingTop: '15px' }}>
                <h1>{t('Young People Register')}</h1>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="firstName">{t('firstName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="lastName">{t('lastName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={lastName}
                                onChange={handleLastNameChange}
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
                                value={gender}
                                onChange={handleGenderChange}
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
                                value={dateOfBirth}
                                onChange={handleDateOfBirthChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <label htmlFor="address">{t('address')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={address}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="city">{t('city')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                value={city}
                                onChange={handleCityChange}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="postalCode">{t('postalCode')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                value={postalCode}
                                onChange={handlePostalCodeChange}
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
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="password">{t('password')}</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="educationalLevel">{t('educationalLevel')}</label>
                            <select
                                className="form-control"
                                id="educationalLevel"
                                value={educationalLevel}
                                onChange={handleEducationalLevelChange}
                                required
                            >
                                <option value="primary">{t('primary')}</option>
                                <option value="secondary">{t('secondary')}</option>
                                <option value="higherEducation">{t('higherEducation')}</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="cv">{t('uploadCV')}</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="cv"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                        required
                    >
                        {t('registerButton')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
