import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const RegisterIntermediary = () => {
    const { t } = useTranslation();
    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
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

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleMiddleNameChange = (e) => {
        setMiddleName(e.target.value);
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
        setFullName('');
        setFirstName('');
        setMiddleName('');
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
        <div className="container">
            <Header />
            <h2 className="mt-4">{t('Young People Register')}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">{t('Full Name')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={fullName}
                        onChange={handleFullNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">{t('First Name')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">{t('Middle Name')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="middleName"
                        value={middleName}
                        onChange={handleMiddleNameChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">{t('Last Name')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">{t('Gender')}</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="genderFemale"
                            value="female"
                            name="gender"
                            checked={gender === 'female'}
                            onChange={handleGenderChange}
                        />
                        <label className="form-check-label" htmlFor="genderFemale">{t('Female')}</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="genderMale"
                            value="male"
                            name="gender"
                            checked={gender === 'male'}
                            onChange={handleGenderChange}
                        />
                        <label className="form-check-label" htmlFor="genderMale">{t('Male')}</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="genderNonBinary"
                            value="nonBinary"
                            name="gender"
                            checked={gender === 'nonBinary'}
                            onChange={handleGenderChange}
                        />
                        <label className="form-check-label" htmlFor="genderNonBinary">{t('Non-Binary')}</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">{t('Date of Birth')}</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleDateOfBirthChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">{t('Address')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">{t('City')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={handleCityChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">{t('State')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        value={state}
                        onChange={handleStateChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">{t('Postal Code')}</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postalCode"
                        value={postalCode}
                        onChange={handlePostalCodeChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">{t('Email')}</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">{t('Password')}</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">{t('Confirm Password')}</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">{t('Phone Number')}</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="educationalLevel">{t('Educational Level')}</label>
                    <select
                        className="form-control"
                        id="educationalLevel"
                        value={educationalLevel}
                        onChange={handleEducationalLevelChange}
                        required
                    >
                        <option value="primary">{t('Primary')}</option>
                        <option value="secondary">{t('Secondary')}</option>
                        <option value="higherEducation">{t('Higher Education')}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cv">{t('Upload CV')}</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="cv"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                >
                    {t('Register Button')}
                </button>
            </form>
        </div>
    );
};

export default RegisterIntermediary;
