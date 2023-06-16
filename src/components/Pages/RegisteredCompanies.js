import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const RegisterPage = () => {
    const { t } = useTranslation();
    const [companyName, setCompanyName] = useState('');
    const [commercialName, setCommercialName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfCreation, setDateOfCreation] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or data processing here
    };

    return (
        <div className="container">
            <Header />
            <div className="mt-4">
                <h2>Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="companyName">Nom de votre entreprise</label>
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
                            <label htmlFor="commercialName">Nom commercial</label>
                            <input
                                type="text"
                                className="form-control"
                                id="commercialName"
                                value={commercialName}
                                onChange={(e) => setCommercialName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="addressLine1">Adresse de l'entreprise (Numéro + 1ère ligne adresse)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine1"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="addressLine2">Adresse de la rue (2ème ligne)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine2"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="city">Ville</label>
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
                            <label htmlFor="postalCode">Code Postal</label>
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
                            <label htmlFor="country">Pays</label>
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
                            <label htmlFor="dateOfCreation">Date de création</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dateOfCreation"
                                value={dateOfCreation}
                                onChange={(e) => setDateOfCreation(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="firstName">Nom et Prénom du porteur de Projet</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="dateOfBirth">Date de naissance (yyyy-mm-dd)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="industry">Sélectionnez votre filière principale</label>
                            <select
                                className="form-control"
                                id="industry"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            >
                                <option value="">Sélectionnez</option>
                                <option value="Numérique">Numérique</option>
                                <option value="Industrie">Industrie</option>
                                <option value="Économie sociale et solidaire">Économie sociale et solidaire</option>
                                <option value="Industrie culturelle et créative">Industrie culturelle et créative</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="maturity">Quelle est la maturité de votre projet</label>
                            <select
                                className="form-control"
                                id="maturity"
                                value={maturity}
                                onChange={(e) => setMaturity(e.target.value)}
                            >
                                <option value="">Sélectionnez</option>
                                <option value="Idéation">Idéation</option>
                                <option value="Produit minimum viable">Produit minimum viable</option>
                                <option value="1er client / 1ers utilisateurs">1er client / 1ers utilisateurs</option>
                                <option value="La commercialisation">La commercialisation</option>
                                <option value="International">International</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="primarySector">Sélectionnez votre secteur d'activité</label>
                            <select
                                className="form-control"
                                id="primarySector"
                                value={primarySector}
                                onChange={(e) => setPrimarySector(e.target.value)}
                            >
                                <option value="">Sélectionnez</option>
                                <option value="Banque / Assurance">Banque / Assurance</option>
                                <option value="BTP">BTP</option>
                                <option value="Chimie">Chimie</option>
                                <option value="Dispositifs médicaux">Dispositifs médicaux</option>
                                <option value="Biotechnologies">Biotechnologies</option>
                                <option value="Commerce / Distribution">Commerce / Distribution</option>
                                <option value="Evenementiel / Communication">Evenementiel / Communication</option>
                                <option value="Industrie pharmaceutique">Industrie pharmaceutique</option>
                                <option value="Informatique / Télécoms">Informatique / Télécoms</option>
                                <option value="Textile / Habillement">Textile / Habillement</option>
                                <option value="Transports / Logistique">Transports / Logistique</option>
                                <option value="Sport et loisirs">Sport et loisirs</option>
                                <option value="Tourisme / restauration">Tourisme / restauration</option>
                                <option value="e-Santé et bien-être">e-Santé et bien-être</option>
                                <option value="Enseignement / Formation">Enseignement / Formation</option>
                                <option value="Energie">Energie</option>
                                <option value="Juridique">Juridique</option>
                                <option value="Industrie numérique">Industrie numérique</option>
                                <option value="Service aux entreprises">Service aux entreprises</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="linkedinPage">Page Linkedin de votre entreprise</label>
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
                            <label htmlFor="twitterPage">Page Twitter de votre entreprise</label>
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
                            <label htmlFor="facebookPage">Page Facebook de votre entreprise</label>
                            <input
                                type="text"
                                className="form-control"
                                id="facebookPage"
                                value={facebookPage}
                                onChange={(e) => setFacebookPage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="contactFirstName">Prénom du contact</label>
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
                            <label htmlFor="contactLastName">Nom du contact</label>
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
                            <label htmlFor="phoneNumber">Téléphone</label>
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
                            <label htmlFor="email">E-mail</label>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
