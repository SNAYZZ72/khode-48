import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCompany from '../../common/Header/HeaderCompany';
import { Modal, Button, Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { auth, firestore } from '../../firebase';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

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
    const [selectedView, setSelectedView] = useState('youthProfiles');
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

    const chartData = [
        { name: 'Proactivity', value: selectedProfile?.proactivity ?? 0, color: '#FF0000' },
        { name: 'Creativity', value: selectedProfile?.creativity ?? 0, color: '#00FF00' },
        { name: 'Initiative', value: selectedProfile?.initiative ?? 0, color: '#0000FF' },
        { name: 'Empathy', value: selectedProfile?.empathy ?? 0, color: '#FFFF00' },
        { name: 'Leadership', value: selectedProfile?.leadership ?? 0, color: '#00FFFF' },
        { name: 'Teamwork', value: selectedProfile?.teamwork ?? 0, color: '#FF00FF' },
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.65;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
        const percentage = (percent * 100).toFixed(1);

        return (
            <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
                {`${chartData[index].name}: ${percentage}%`}
            </text>
        );
    };

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

    //fonction qui permet de filtrer les profils en fonction des skills, donc filtrer par le nombre de points qu'il y a dans ce skill pour chaque profile    
    const filterProfiles = () => {
        if (filterQuery === '') {
            return youthProfiles;
        }

        const selectedSkill = filterQuery.toLowerCase();

        return youthProfiles
            .filter((profile) => profile[selectedSkill] !== undefined)
            .sort((a, b) => {
                const aPoints = a[selectedSkill] || 0;
                const bPoints = b[selectedSkill] || 0;
                return bPoints - aPoints;
            });
    };


    const searchedProfiles = filterProfiles().filter((profile) =>
        profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterJobs = () => {
        if (filterQuery === '') {
            return jobs;
        }

        const selectedDate = filterQuery;

        return jobs
            .filter((job) => job[selectedDate] !== undefined)
            .sort((a, b) => {
                const aDate = new Date(a[selectedDate]);
                const bDate = new Date(b[selectedDate]);

                if (selectedDate === 'jobBeginDate') {
                    return aDate - bDate; // Tri de la plus proche à la plus lointaine
                } else {
                    return 0; // Pour le cas de la clé 'jobEndDate', aucun tri n'est effectué
                }
            });
    };

    const searchedJobs = filterJobs().filter((job) =>
        job.jobName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <p><b>{t('fullName')}:</b> {selectedProfile.firstName} {selectedProfile.lastName}</p>
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('email')}:</b> {selectedProfile.email}</p>
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('phoneNumber')}:</b> {selectedProfile.phoneNumber}</p>
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('description')}:</b> {selectedProfile.information}</p>
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('listExperience')}:</b></p>
                            {selectedProfile.listExperience.map((experience, index) => (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <p key={index}>{experience}</p>
                                    </li>
                                </ul>
                            ))}
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('listLanguages')}:</b></p>
                            {selectedProfile.listLanguages.map((language, index) => (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <p key={index}>{language}</p>
                                    </li>
                                </ul>
                            ))}
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('educationalLevel')}:</b> {selectedProfile.educationalLevel}</p>
                        </li>
                        <li className="list-group-item">
                            <p><b>{t('city')}:</b> {selectedProfile.city}</p>
                        </li>
                        <li className="list-group-item">

                            <ResponsiveContainer height={250} width="100%">
                                <PieChart>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={60}
                                        label={renderCustomizedLabel}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </li>
                    </ul>
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
          
                <div style={{ paddingTop: '15px' }}>
                    <div className="row mb-3">
                        <div className="col-md-9" style={{ paddingBottom: '10px' }}>
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
                                    {existingSkills.map((skill) => (
                                        <option key={skill} value={skill}>
                                            {skill}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {searchedProfiles.length > 0 ? (
                        <li className="list-group">
                            {searchedProfiles.map((profile) => (
                                <li key={profile.id} className="list-group-item profile-item">
                                    <div className="row mb-3">
                                        <div className="col-md-10">
                                            <div className="row">
                                                <h3>{t('fullName')}: {profile.firstName} {profile.lastName}</h3>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <p><b>{t('proactivity')}:</b> {profile.proactivity || 0}</p>
                                                </div>
                                                <div className="col">
                                                    <p><b>{t('creativity')}:</b> {profile.creativity || 0}</p>
                                                </div>
                                                <div className="col">
                                                    <p><b>{t('initiative')}:</b> {profile.initiative || 0}</p>
                                                </div>
                                                <div className="col">
                                                    <p><b>{t('empathy')}:</b> {profile.empathy || 0}</p>
                                                </div>
                                                <div className="col">
                                                    <p><b>{t('leadership')}:</b> {profile.leadership || 0}</p>
                                                </div>
                                                <div className="col">
                                                    <p><b>{t('teamwork')}:</b> {profile.teamwork || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="text-center" style={{ paddingTop: '30px' }}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleSeeMoreAbout(profile)}
                                                    style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                                >
                                                    {t('View profile')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </li>
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
                <div style={{ paddingTop: '15px' }}>
                    <div className="row mb-3">
                        <div className="col-md-2 text-center" style={{ paddingBottom: '10px' }}>
                            <button className="btn btn-primary" onClick={handleShowModal} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                {t('CreateNewJob')}
                            </button>
                        </div>
                        <div className="col-md-8" style={{ paddingBottom: '10px' }}>
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
                        <div className="col-md-2">
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
                                    <option value="jobBeginDate">{t('Begin Date')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {searchedJobs.length > 0 ? (
                        <li className="list-group">
                            {searchedJobs.map((job) => (
                                <li key={job.id} className="list-group-item profile-item">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="row"></div>
                                            <h3>{t('jobName')}: {job.jobName}</h3>
                                            <ul className="list-group" style={{ paddingBottom: '10px' }}>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobDescription')}:</b> {job.jobDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3" style={{ paddingTop: '42px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobLocation')}:</b> {job.jobLocation}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobBeginDate')}:</b> {job.jobBeginDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobEndDate')}:</b> {job.jobEndDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobPosition')}:</b> {job.jobPosition}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3" style={{ paddingTop: '42px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobSkills')}:</b> </p> {job.jobSkills.map((points, index) => (
                                                            <p key={index}>
                                                                {existingSkills[index]}: {points}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </li>
                    ) : (
                        <p>{t('No jobs found')}</p>
                    )}
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} >
                    <Modal.Header closeButton>
                        <Modal.Title>{t('CreateNewJob')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
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
                                <textarea
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
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('createJob')}
                        </Button>
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
            <Container>
                <div className="row mb-3">
                    <div className="col">
                        <button
                            onClick={() => handleViewSelect('youthProfiles')}
                            className="form-control"
                            style={{ border: selectedView === 'youthProfiles' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'youthProfiles' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('showYouthProfiles')}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            onClick={() => handleViewSelect('Job')}
                            className="form-control"
                            style={{ border: selectedView === 'Job' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'Job' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('showJobs')}
                        </button>
                    </div>
                </div>
                {renderView()}
                {renderProfileModal()}
            </Container>
        </div>
    );
};

export default HomeCompany;