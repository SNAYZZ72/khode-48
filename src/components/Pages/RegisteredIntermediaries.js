import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

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
    const [primarySector, setPrimarySector] = useState('');
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
        <div className="container">
            <Header />
            <div className="mt-4">
                <h2>{t('CompanyRegister')}</h2>
                <form onSubmit={handleSubmit}>
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
                            <label htmlFor="addressLine">{t('addressLine')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                            <label htmlFor="country">{t('country')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
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
                    </div>
                    <div className="row mb-3">
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
                            <label htmlFor="primarySector">{t('Select your primary sector')}</label>
                            <select
                                className="form-control"
                                id="primarySector"
                                value={primarySector}
                                onChange={(e) => setPrimarySector(e.target.value)}
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
                    </div>
                    <div className="row mb-3">
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
                    </div>
                    <div className="row mb-3">
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

export default RegisterIntermediaryPage;
