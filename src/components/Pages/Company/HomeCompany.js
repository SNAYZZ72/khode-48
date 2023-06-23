import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCompany from '../../common/Header/HeaderCompany';
import { Modal, Button } from 'react-bootstrap';

const HomeCompany = () => {

    const { t } = useTranslation();

    const profilesData = [
        {
            name: 'John Doe',
            age: 20,
            location: 'bilbao',
            totalPoints: 150,
            skills: [
                { name: 'Coding', acquiredPoints: 100 },
                { name: 'Design', acquiredPoints: 50 },
            ],
            projects: 5,
            profilePhoto: '../intermediary-profile-image.png', // Add the profile photo path here
        },
        {
            name: 'Sarah',
            age: 22,
            location: 'vitoria',
            totalPoints: 200,
            skills: [
                { name: 'Marketing', acquiredPoints: 150 },
                { name: 'Photography', acquiredPoints: 50 },
            ],
            projects: 3,
            profilePhoto: 'sarah-profile.jpg', // Add the profile photo path here
        },
        {
            name: 'Iris',
            age: 21,
            location: 'bilbao',
            totalPoints: 200,
            skills: [
                { name: 'Marketing', acquiredPoints: 150 },
                { name: 'Photography', acquiredPoints: 50 },
            ],
            projects: 7,
            profilePhoto: 'iris-profile.jpg', // Add the profile photo path here
        },
        // Add more profiles as needed
    ];

    const [profiles, setProfiles] = useState(profilesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };

    const filterProfiles = () => {
        if (filterQuery === '') {
            return profiles;
        }

        return profiles.filter((profile) =>
            profile.skills.some((skill) => skill.name.includes(filterQuery))
        );
    };

    const filteredProfiles = filterProfiles();

    const searchProfiles = () => {
        if (searchQuery === '') {
            return filterProfiles();
        }

        return filterProfiles().filter((profile) =>
            profile.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const searchedProfiles = searchProfiles();

    const handleSeeMore = (profile) => {
        setSelectedProfile(profile);
    };

    const handleCloseModal = () => {
        setSelectedProfile(null);
    };

    return (
        <>
            <HeaderCompany />
            <div className="container">
                <h2>{t('Young People Profiles')}</h2>

                <div className="row mb-3">
                    <div className="col-md-9">
                        <div className="input-group">
                            <span className="input-group-text">{t('Search')}:</span>
                            <input
                                type="text"
                                className="form-control"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                {t('Filter')}:
                            </span>
                            <select
                                className="form-select"
                                value={filterQuery}
                                onChange={handleFilterChange}
                            >
                                <option value="">{t('All')}</option>
                                <option value="Coding">{t('Coding')}</option>
                                <option value="Design">{t('Design')}</option>
                                <option value="Marketing">{t('Marketing')}</option>
                                <option value="Photography">{t('Photography')}</option>
                            </select>
                        </div>
                    </div>
                </div>
                {filteredProfiles.length === 0 ? (
                    <p>{t('No profiles found.')}</p>
                ) : (
                    <ul className="list-group">
                        {filteredProfiles.map((profile, index) => (
                            <li key={index} className="list-group-item profile-item">
                                <div className="row mb-3">
                                    <div className="col-md-2 text-center">
                                        <div className="profile-photo">
                                            <img src={profile.profilePhoto} alt={profile.name} style={{ width: '80%', height: 'auto' }} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="row">
                                            <div className="col">
                                                <h2>{profile.name}</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="row">
                                                <p>{t('Age')}: {profile.age}</p>
                                            </div>
                                            <div className="row">
                                                <p>{t('Location')}: {profile.location}</p>
                                            </div>
                                            <div className="row">
                                                <p>{t('Total Points')}: {profile.totalPoints}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <ul className="list-group">
                                            {profile.skills.map((skill, skillIndex) => (
                                                <li key={skillIndex} className="list-group-item">
                                                    {skill.name} - {t('Acquired Points')}: {skill.acquiredPoints}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col text-center" style={{ paddingTop: "5.6%" }}>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSeeMore(profile)}
                                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                        >
                                            {t('See More')}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Modal Popup */}
                <Modal show={selectedProfile} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedProfile && selectedProfile.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedProfile && (
                            <>
                                <div className="text-center">
                                    <div className="profile-photo">
                                        <img src={selectedProfile.profilePhoto} alt={selectedProfile.name} style={{ width: "80%" }} />
                                    </div>
                                </div>
                                <p>{t('Age')}: {selectedProfile.age}</p>
                                <p>{t('Location')}: {selectedProfile.location}</p>
                                <p>{t('Total Points')}: {selectedProfile.totalPoints}</p>
                                <p>{t('Projects Participated')}: {selectedProfile.projects}</p>
                                <p>{t('Skills')}:</p>
                                <ul className="list-group">
                                    {selectedProfile.skills.map((skill, skillIndex) => (
                                        <li key={skillIndex} className="list-group-item">
                                            {skill.name} - {t('Acquired Points')}: {skill.acquiredPoints}
                                        </li>
                                    ))}
                                </ul>
                                {/* Add additional information here */}
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            {t('Close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default HomeCompany;
