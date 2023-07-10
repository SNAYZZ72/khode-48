import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCompany from '../../common/Header/HeaderCompany';
import { Modal, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { auth, firestore } from '../../firebase';

const existingSkills = [
    'Proactivity',
    'Creativity',
    'Initiative',
    'Empathy',
    'Leadership',
    'Teamwork',
];

const HomeCompany = () => {

    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [selectedView, setSelectedView] = useState('');
    const [youthProfiles, setYouthProfiles] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleSeeMoreAbout = (profile) => {
        setSelectedProfile(profile);
        setShowProfileModal(true);
    };


    const [skillsList, setSkillsList] = useState([
        { id: 1, name: 'Proactivity', minPoints: 0, checked: false },
        { id: 2, name: 'Creativity', minPoints: 0, checked: false },
        { id: 3, name: 'Initiative', minPoints: 0, checked: false },
        { id: 4, name: 'Empathy', minPoints: 0, checked: false },
        { id: 5, name: 'Leadership', minPoints: 0, checked: false },
        { id: 6, name: 'Teamwork', minPoints: 0, checked: false },
    ]);

    const [createdJobs, setCreatedJobs] = useState({
        Name: '',
        Description: '',
        Skills: [],
        Location: '',
        BeginDate: '',
        EndDate: '',
        Position: '',
    });

    const handleSkillChange = (skillId, checked) => {
        setSkillsList((prevSkillsList) =>
            prevSkillsList.map((skill) =>
                skill.id === skillId ? { ...skill, checked } : skill
            )
        );
    };

    const handleMinPointsChange = (skillId, minPoints) => {
        setSkillsList((prevSkillsList) =>
            prevSkillsList.map((skill) =>
                skill.id === skillId ? { ...skill, minPoints } : skill
            )
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Skills') {
            const selectedSkills = skillsList
                .filter((skill) => skill.checked)
                .map(({ id, name, minPoints }) => ({ id, name, minPoints }));
            setCreatedJobs((prevCreatedJobs) => ({
                ...prevCreatedJobs,
                Skills: selectedSkills,
            }));
        } else {
            setCreatedJobs((prevCreatedJobs) => ({
                ...prevCreatedJobs,
                [name]: value,
            }));
        }
    };




    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };

    const handleSeeMore = (profile) => {
        setSelectedProfile(profile);
    };

    //Here we are fetching all youth users from the database
    const fetchYouthProfiles = async () => {
        const youthProfilesRef = firestore.collection('users').doc('usersyouth');
        const doc = await youthProfilesRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            const userData = doc.data();
            const youthProfiles = Object.values(userData);
            setYouthProfiles(youthProfiles);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const currentDate = new Date();
        const beginDate = new Date(createdJobs.BeginDate);
        const endDate = new Date(createdJobs.EndDate);

        //if we are on the youth profiles view
        if (selectedView === 'youthProfiles') {

        }

        //if we are on the job view
        if (selectedView === 'Job') {
            if (createdJobs.Name === '' || createdJobs.Description === '' || createdJobs.Skills === '' || createdJobs.Location === '' || createdJobs.BeginDate === '' || createdJobs.EndDate === '' || createdJobs.Position === '') {
                alert('Please fill out all the fields');
                return;
            }
            if (beginDate < currentDate) {
                alert('Begin date must be after today');
                return;
            }
            if (endDate < beginDate) {
                alert('End date must be after begin date');
                return;
            }

            // Filter the selected skills with their minimum points
            const selectedSkills = skillsList.map((skill) => skill.minPoints);

            //get uid of the current user
            const userId = auth.currentUser.uid;

            //get the name of the current company
            const companyRef = firestore.collection('users').doc('userscompany');
            const userDoc = await companyRef.get();
            const userData = userDoc.data()[userId];

            //Here we are creating the job in the database
            const sentJob = {
                jobName: createdJobs.Name,
                jobDescription: createdJobs.Description,
                jobSkills: selectedSkills,
                jobLocation: createdJobs.Location,
                jobBeginDate: createdJobs.BeginDate,
                jobEndDate: createdJobs.EndDate,
                jobPosition: createdJobs.Position,
                companyName: userData.companyName,
            };

            const parentDocRef = firestore.collection('jobs').doc(userId);

            //Generate a random map name
            const mapName = uuidv4();

            await parentDocRef.set({ [mapName]: sentJob }, { merge: true });

            alert('Job created successfully');

            //Here we are resetting the form
            setCreatedJobs({
                Name: '',
                Description: '',
                Skills: [],
                Location: '',
                BeginDate: '',
                EndDate: '',
                Position: '',
            });

            //reload the page
            window.location.reload();
        }
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedProfile(null);
    };

    const handleViewSelect = (view) => {
        setSelectedView(view);
    };

    useEffect(() => {
        fetchYouthProfiles();
        fetchJobs();
    }, []);

    //choose what view to render
    const renderView = () => {
        if (selectedView === 'youthProfiles') {
            return renderYouthProfiles();
        } else if (selectedView === 'Job') {
            return renderJob();
        }
    };
    //Here we are fetching the jobs from the database of the current uid
    const fetchJobs = async () => {
        const userId = auth.currentUser.uid;
        const jobsRef = firestore.collection('jobs').doc(userId);
        const doc = await jobsRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            const userData = doc.data();
            const jobs = Object.values(userData);
            setJobs(jobs);
        }
    };

    //Display more info about the young user
    const renderProfileModal = () => {
        if (!selectedProfile) {
            return null;
        }

        return (
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Profile')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('fullName')}: {selectedProfile.firstName} {selectedProfile.lastName}</p>
                    <p>{t('email')}: {selectedProfile.email}</p>
                    <p>{t('phoneNumber')}: {selectedProfile.phoneNumber}</p>
                    <p>{t('description')}: {selectedProfile.information}</p>
                    <p>
                        {t('listExperience')}:
                        {selectedProfile.listExperience.map((experience, index) => (
                            <p key={index}>{experience}</p>
                        ))}
                    </p>
                    <p>
                        {t('listLanguages')}:
                        {selectedProfile.listLanguages.map((language, index) => (
                            <p key={index}>{language}</p>
                        ))}
                    </p>
                    <p>{t('educationalLevel')}: {selectedProfile.educationalLevel}</p>
                    <p>{t('city')}: {selectedProfile.city}</p>

                    {existingSkills.map((skill) => (
                        <p key={skill}>{t(skill)}: {selectedProfile[skill.toLowerCase()] || 0}</p>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
                        {t('close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };


    //View of youth profiles
    const renderYouthProfiles = () => {
        return (
            <div>
                <h3>{t('Youth Profiles')}</h3>
                {youthProfiles.length > 0 ? (
                    <ul>
                        {youthProfiles.map((profile) => (
                            <li key={profile.id} onClick={() => handleSeeMoreAbout(profile)}>
                                <p>{t('fullName')}: {profile.firstName} {profile.lastName}</p>
                                <p>{t('proactivity')}: {profile.proactivity || 0}</p>
                                <p>{t('creativity')}: {profile.creativity || 0}</p>
                                <p>{t('initiative')}: {profile.initiative || 0}</p>
                                <p>{t('empathy')}: {profile.empathy || 0}</p>
                                <p>{t('leadership')}: {profile.leadership || 0}</p>
                                <p>{t('teamwork')}: {profile.teamwork || 0}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('No youth profiles found')}</p>
                )}
            </div>
        )

    };

    //View of job
    const renderJob = () => {
        const renderSkillsList = () => {
            return skillsList.map((skill) => (
                <div key={skill.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`skill-${skill.id}`}
                        checked={skill.checked}
                        onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`skill-${skill.id}`}>
                        {skill.name}
                    </label>
                    {skill.checked && (
                        <input
                            type="number"
                            className="form-control"
                            id={`skill-minPoints-${skill.id}`}
                            value={skill.minPoints}
                            onChange={(e) => handleMinPointsChange(skill.id, e.target.value)}
                            required
                        />
                    )}
                </div>
            ));
        };

        return (
            <div>
                <button onClick={handleShowModal}>
                    <h5>{t('CreateNewJob')}</h5>
                </button>
                {jobs.length > 0 ? (
                    <ul>
                        {jobs.map((job) => (
                            <li key={job.id}>
                                <p>{t('jobName')}: {job.jobName}</p>
                                <p>{t('jobDescription')}: {job.jobDescription}</p>
                                <p>{t('jobSkills')}:</p>
                                <ul>
                                    {job.jobSkills.map((points, index) => (
                                        <li key={index}>
                                            {existingSkills[index]}: {points}
                                        </li>
                                    ))}
                                </ul>
                                <p>{t('jobLocation')}: {job.jobLocation}</p>
                                <p>{t('jobBeginDate')}: {job.jobBeginDate}</p>
                                <p>{t('jobEndDate')}: {job.jobEndDate}</p>
                                <p>{t('jobPosition')}: {job.jobPosition}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('No jobs found')}</p>
                )}

                <Modal show={showModal} onHide={() => setShowModal(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{t('CreateNewJob')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className='form-label'>{t('jobName')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id='jobName'
                                    name='Name'
                                    value={createdJobs.Name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>{t('jobDescription')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id='jobDescription'
                                    name='Description'
                                    value={createdJobs.Description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('jobSkills')}</label>
                                {renderSkillsList()}
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>{t('jobLocation')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id='jobLocation'
                                    name='Location'
                                    value={createdJobs.Location}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>{t('jobBeginDate')}</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id='jobBeginDate'
                                    name='BeginDate'
                                    value={createdJobs.BeginDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>{t('jobEndDate')}</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id='jobEndDate'
                                    name='EndDate'
                                    value={createdJobs.EndDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label'>{t('jobPosition')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id='jobPosition'
                                    name='Position'
                                    value={createdJobs.Position}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">{t('createJob')}</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)} >
                            {t('close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    };

    return (
        <div>
            <HeaderCompany />
            <div className="view-selector">
                <button onClick={() => handleViewSelect('youthProfiles')}>
                    {t('showYouthProfiles')}
                </button>
                <button onClick={() => handleViewSelect('Job')}>
                    {t('showJobs')}
                </button>
            </div>
            {renderView()}
            {renderProfileModal()}
        </div>
    );
};

export default HomeCompany;