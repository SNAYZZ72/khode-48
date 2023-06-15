import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header'

const Contact = () => {
    const { t } = useTranslation();
    return (
        <div>
            <Header />
            <h1>{t('Contact')}</h1>
        </div>
    );
}
export default Contact;
