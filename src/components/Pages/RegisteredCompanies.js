import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const RegisterCompanies = () => {
    const { t } = useTranslation();
    const [cvFile, setCvFile] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCvFile(file);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="container">
            <Header />
            <h2 className="mt-4">{t('Young People Register')}</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="fullName">{t('fullName')}</label>
                    <input type="text" className="form-control" id="fullName" />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">{t('firstName')}</label>
                    <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="form-group">
                    <label htmlFor="middleName">{t('middleName')}</label>
                    <input type="text" className="form-control" id="middleName" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">{t('lastName')}</label>
                    <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">{t('gender')}</label>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="genderFemale" value="female" name="gender" />
                        <label className="form-check-label" htmlFor="genderFemale">{t('female')}</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="genderMale" value="male" name="gender" />
                        <label className="form-check-label" htmlFor="genderMale">{t('male')}</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" className="form-check-input" id="genderNonBinary" value="nonBinary" name="gender" />
                        <label className="form-check-label" htmlFor="genderNonBinary">{t('nonBinary')}</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">{t('dateOfBirth')}</label>
                    <input type="date" className="form-control" id="dateOfBirth" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">{t('address')}</label>
                    <input type="text" className="form-control" id="address" />
                </div>
                <div className="form-group">
                    <label htmlFor="city">{t('city')}</label>
                    <input type="text" className="form-control" id="city" />
                </div>
                <div className="form-group">
                    <label htmlFor="state">{t('state')}</label>
                    <input type="text" className="form-control" id="state" />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">{t('postalCode')}</label>
                    <input type="text" className="form-control" id="postalCode" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">{t('email')}</label>
                    <input type="email" className="form-control" id="email" />
                </div><div className="form-group">
                    <label htmlFor="password">{t('password')}</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">{t('phoneNumber')}</label>
                    <input type="tel" className="form-control" id="phoneNumber" />
                </div>
                <div className="form-group">
                    <label htmlFor="educationalLevel">{t('educationalLevel')}</label>
                    <select className="form-control" id="educationalLevel">
                        <option value="primary">{t('primary')}</option>
                        <option value="secondary">{t('secondary')}</option>
                        <option value="higherEducation">{t('higherEducation')}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cv">{t('uploadCV')}</label>
                    <input type="file" className="form-control-file" id="cv" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>{t('registerButton')}</button>
            </form>
        </div>
    );
};

export default RegisterCompanies;