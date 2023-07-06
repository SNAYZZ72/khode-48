import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../common/Header/Header';

const RegisterIntermediaryPage = () => {
    const { t } = useTranslation();
    const [companyName, setCompanyName] = useState('');
    const [commercialName, setCommercialName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [industry, setIndustry] = useState('');
    const [maturity, setMaturity] = useState('');
    const [linkedinPage, setLinkedinPage] = useState('');
    const [twitterPage, setTwitterPage] = useState('');
    const [facebookPage, setFacebookPage] = useState('');
    const [contactFirstName, setContactFirstName] = useState('');
    const [contactLastName, setContactLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or data processing here
    };

    return (
        <div>
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{t('IntermediariesRegister')}</h1>
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
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="commercialName">{t('Commercials name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="commercialName"
                                value={commercialName}
                                onChange={(e) => setCommercialName(e.target.value)}
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="postalCode">{t('postalCode')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
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
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
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
                                value={maturity}
                                onChange={(e) => setMaturity(e.target.value)}
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
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="contactFirstName">{t('ContactFirstName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactFirstName"
                                value={contactFirstName}
                                onChange={(e) => setContactFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="contactLastName">{t('ContactLastName')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contactLastName"
                                value={contactLastName}
                                onChange={(e) => setContactLastName(e.target.value)}
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
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="email">{t('email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="linkedinPage">{t('Companys Linkedin Page')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="linkedinPage"
                                value={linkedinPage}
                                onChange={(e) => setLinkedinPage(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="twitterPage">{t('Companys Twitter Page')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="twitterPage"
                                value={twitterPage}
                                onChange={(e) => setTwitterPage(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="facebookPage">{t('Companys Facebook Page')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="facebookPage"
                                value={facebookPage}
                                onChange={(e) => setFacebookPage(e.target.value)}
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
        </div>
    );
};

export default RegisterIntermediaryPage;
