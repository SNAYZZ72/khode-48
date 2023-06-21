import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { Modal, Button } from 'react-bootstrap';

const HomeYouth = () => {
    const { t } = useTranslation();

    const profilesData = [
        {
            name: 'John',
            age: 20,
            location: 'bilbao',
            totalPoints: 150,
            skills: [
                { name: 'Coding', acquiredPoints: 100 },
                { name: 'Design', acquiredPoints: 50 },
            ],
            projects: 5,
            profilePhoto: 'john-profile.jpg', // Add the profile photo path here
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
        <HeaderYouth />
        <div className="container">
            <h2>{t('Young People Profiles')}</h2>

            <div className="input-group mb-3">
                <span className="input-group-text">{t('Search')}:</span>
                <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="input-group mb-3">
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

            {filteredProfiles.length === 0 ? (
                <p>{t('No profiles found.')}</p>
            ) : (
                <ul className="list-group">
                    {filteredProfiles.map((profile, index) => (
                        <li key={index} className="list-group-item profile-item">
                            <div className="profile-header">
                                <div className="profile-photo">
                                    <img src={profile.profilePhoto} alt={profile.name} />
                                </div>
                                <div className="profile-details">
                                    <h3>{profile.name}</h3>
                                    <p>{t('Age')}: {profile.age}</p>
                                    <p>{t('Location')}: {profile.location}</p>
                                    <p>{t('Total Points')}: {profile.totalPoints}</p>
                                </div>
                            </div>
                            <p>{t('Skills')}:</p>
                            <ul className="list-group">
                                {profile.skills.map((skill, skillIndex) => (
                                    <li key={skillIndex} className="list-group-item">
                                        {skill.name} - {t('Acquired Points')}: {skill.acquiredPoints}
                                    </li>
                                ))}
                            </ul>
                            <br />
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSeeMore(profile)}
                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                            >
                                {t('See More')}
                            </button>
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
                            <div className="profile-photo">
                                <img src={selectedProfile.profilePhoto} alt={selectedProfile.name} />
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

export default HomeYouth;
