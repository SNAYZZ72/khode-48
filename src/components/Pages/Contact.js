import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const Contact = () => {
    const { t } = useTranslation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        // You can send the form data to a backend server or perform any other actions
        // Reset form fields after submission if needed
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <div>
            <Header />
            <div className="container">
            <h1>{t('Contact')}</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="firstName" className="form-label">{t('Your Name')}</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder={t('Andrés')}
                            required
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="lastName" className="form-label">{t('Lastname')}</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder={t('Iniesta')}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">{t('E-mail')}</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder={t('ex: myname@example.com')}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">{t('Subject')}</label>
                    <input
                        type="text"
                        id="subject"
                        className="form-control"
                        value={subject}
                        onChange={handleSubjectChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">{t('Message')}</label>
                    <textarea
                        id="message"
                        className="form-control"
                        value={message}
                        onChange={handleMessageChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{t('Submit')}</button>
            </form>
        </div>
        </div>
    );
};

export default Contact;
