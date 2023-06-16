import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header'

const Career = () => {
    const { t } = useTranslation();

    return (
        <div className="Career">
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{t('careerTitle')}</h1>
            </div>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h3>{t('mission')}</h3>
                        <p>{t('missionDescription')}</p>
                    </div>
                    <div className="col-md-6">
                        <h3>{t('vision')}</h3>
                        <p>{t('visionDescription')}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h3>{t('values')}</h3>
                    <ul className="list-group">
                        <li className="list-group-item">{t('value1')}</li>
                        <li className="list-group-item">{t('value2')}</li>
                        <li className="list-group-item">{t('value3')}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Career;
