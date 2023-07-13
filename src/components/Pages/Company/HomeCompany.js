import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCompany from '../../common/Header/HeaderCompany';
import { Modal, Button, Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { auth, firestore } from '../../firebase';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import firebase from 'firebase/compat/app';


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
    const [searchJobQuery, setSearchJobQuery] = useState('');
    const [filterJobQuery, setFilterJobQuery] = useState('');
    const [searchYoungQuery, setSearchYoungQuery] = useState('');
    const [filterYoungQuery, setFilterYoungQuery] = useState('');
    const [searchApplicationQuery, setSearchApplicationQuery] = useState('');
    const [filterApplicationQuery, setFilterApplicationQuery] = useState('');
    const [searchApprovedApplicationQuery, setSearchApprovedApplicationQuery] = useState('');
    const [filterApprovedApplicationQuery, setFilterApprovedApplicationQuery] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [selectedView, setSelectedView] = useState('youthProfiles');
    const [youthProfiles, setYouthProfiles] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [visibleProfiles, setVisibleProfiles] = useState(10);
    const [visibleJobs, setVisibleJobs] = useState(10);
    const [visiblePendingApplication, setVisiblePendingApplication] = useState(10);
    const [pendingApplication, setPendingApplication] = useState([]);
    const [userApprovedApplications, setUserApprovedApplications] = useState([]);
    const [visibleApprovedApplications, setVisibleApprovedApplications] = useState(10);


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

    const handleSearchJobChange = (event) => {
        setSearchJobQuery(event.target.value);
    };

    const handleFilterJobChange = (event) => {
        setFilterJobQuery(event.target.value);
    };

    const handleSearchYoungChange = (event) => {
        setSearchYoungQuery(event.target.value);
    };

    const handleFilterYoungChange = (event) => {
        setFilterYoungQuery(event.target.value);
    };

    const handleSearchApplicationChange = (event) => {
        setSearchApplicationQuery(event.target.value);
    };

    const handleFilterApplicationChange = (event) => {
        setFilterApplicationQuery(event.target.value);
    };

    const searchedApplications = pendingApplication.filter((pendingApplication) =>
        pendingApplication.jobName.toLowerCase().includes(searchApplicationQuery.toLowerCase()) ||
        pendingApplication.firstName.toLowerCase().includes(searchApplicationQuery.toLowerCase()) ||
        pendingApplication.lastName.toLowerCase().includes(searchApplicationQuery.toLowerCase()) ||
        `${pendingApplication.firstName} ${pendingApplication.lastName}`.toLowerCase().includes(searchApplicationQuery.toLowerCase())
    );

    const handleSearchApprovedApplicationChange = (event) => {
        setSearchApprovedApplicationQuery(event.target.value);
    };

    const handleFilterApprovedApplicationChange = (event) => {
        setFilterApprovedApplicationQuery(event.target.value);
    };

    const searchedApprovedApplications = userApprovedApplications.filter((approved) =>
        approved.jobName.toLowerCase().includes(searchApprovedApplicationQuery.toLowerCase()) ||
        approved.firstName.toLowerCase().includes(searchApprovedApplicationQuery.toLowerCase()) ||
        approved.lastName.toLowerCase().includes(searchApprovedApplicationQuery.toLowerCase()) ||
        `${approved.firstName} ${approved.lastName}`.toLowerCase().includes(searchApprovedApplicationQuery.toLowerCase())
    );

    const handleLoadMoreYouth = () => {
        setVisibleProfiles((prevVisibleProfiles) => prevVisibleProfiles + 10);
    };

    const handleLoadMoreJobs = () => {
        setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 10);
    };

    const handleLoadMoreApplications = () => {
        setVisiblePendingApplication((prevVisiblePendingApplication) => prevVisiblePendingApplication + 10);
    };

    const handleLoadMoreApprovedApplications = () => {
        // Increase the number of visible applications when the "Load More" button is clicked *useful so the website doesn't crash when loading too many jobs*
        setVisibleApprovedApplications((prevVisibleApprovedApplications) => prevVisibleApprovedApplications + 10);
    };

    //fonction qui permet de filtrer les profils en fonction des skills, donc filtrer par le nombre de points qu'il y a dans ce skill pour chaque profile    
    const filterProfiles = () => {
        if (filterYoungQuery === '') {
            return youthProfiles;
        }

        const selectedSkill = filterYoungQuery.toLowerCase();

        return youthProfiles
            .filter((profile) => profile[selectedSkill] !== undefined)
            .sort((a, b) => {
                const aPoints = a[selectedSkill] || 0;
                const bPoints = b[selectedSkill] || 0;
                return bPoints - aPoints;
            });
    };


    const searchedProfiles = filterProfiles().filter((profile) =>
        profile.firstName.toLowerCase().includes(searchYoungQuery.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(searchYoungQuery.toLowerCase()) ||
        `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchYoungQuery.toLowerCase())
    );

    const filterJobs = () => {
        if (filterJobQuery === '') {
            return jobs;
        }

        const selectedDate = filterJobQuery;

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
        job.jobName.toLowerCase().includes(searchJobQuery.toLowerCase())
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
        fetchUserApplications();
        fetchUserApprovedApplications();
    }, []);

    //Here we fetch pending applications
    const fetchUserApplications = async () => {
        try {
            const userId = auth.currentUser.uid;
            const applicationsRef = firestore.collection('jobsApplication').doc(userId);
            const doc = await applicationsRef.get();
            if (doc.exists) {
                const userData = doc.data();
                const applications = Object.values(userData);
                setPendingApplication(applications);
            }
        } catch (error) {
            console.error('Error fetching user applications:', error);
        }
    };
    //Here we fetch approved applications
    const fetchUserApprovedApplications = async () => {
        try {
            const userId = auth.currentUser.uid;
            const approvedRef = firestore.collection('jobsApproval').doc(userId);
            const doc = await approvedRef.get();
            if (doc.exists) {
                const userData = doc.data();
                const approved = Object.values(userData);
                setUserApprovedApplications(approved);
            }
        } catch (error) {
            console.error('Error fetching user applications:', error);
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

    //choose what view to render
    const renderView = () => {
        if (selectedView === 'youthProfiles') {
            return renderYouthProfiles();
        } else if (selectedView === 'Job') {
            return renderJob();
        } else if (selectedView === 'pendingApplication') {
            return renderPendingApplication();
        } else if (selectedView === 'approvedApplication') {
            return renderApprovedApplication();
        }

    };
    //List who have been approved
    const renderApprovedApplication = () => {
        const visibleApprovedApplicationData = searchedApprovedApplications.slice(0, visibleApprovedApplications);

        //here a function able to delete an approved application. Can be useful to sort the approved applications or to cancel an approved application
        const deleteApprovedApplication = async (userIdentification, mapName) => {
            try {
                const userId = auth.currentUser.uid;
                const approvedRef = firestore.collection('jobsApproval').doc(userId);
                const neededId = userIdentification + mapName;
                const removeField = firebase.firestore.FieldValue.delete();
                await approvedRef.update({
                    [neededId]: removeField,
                });
                alert('Approved application deleted successfully!');
                window.location.reload();
            } catch (error) {
                console.error('Error deleting approved application:', error);
            }
        };

        return (
            <div>
                <div style={{ paddingTop: '15px' }}>
                    <div className="row mb-3">
                        <div className="col" style={{ paddingBottom: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-text">{t('search')}:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={searchApprovedApplicationQuery}
                                    onChange={handleSearchApprovedApplicationChange}
                                />
                            </div>
                        </div>
                    </div>
                    {visibleApprovedApplicationData.length > 0 ? (
                        <ul className="list-group">
                            {visibleApprovedApplicationData.map((approved) => (
                                <li key={approved.id} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('jobName')}: {approved.jobName}</h3>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('firstName')}:</b> {approved.firstName} {approved.lastName}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('email')}:</b> {approved.email}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-end">
                                            <button className="btn btn-primary" onClick={() => deleteApprovedApplication(approved.userIdentification, approved.mapName)} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                                {t('removeFromApproved')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{t('No approved applications.')}</p>
                    )}
                    {visibleApprovedApplications < userApprovedApplications.length && (
                        <div className="text-center" style={{ paddingTop: '15px' }}>
                            <button className="btn btn-primary" onClick={handleLoadMoreApprovedApplications} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                {t('LoadMore')}
                            </button>
                        </div>
                    )}
                </div>

            </div>
        );
    };



    //Display more info about the young user
    const renderProfileModal = () => {
        if (!selectedProfile) {
            return null;
        }

        return (
            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile')}</Modal.Title>
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
                            <p><b>{t('city')} / {t('postalCode')}:</b> {selectedProfile.city} / {selectedProfile.postalCode}</p>
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

    const renderPendingApplication = () => {
        const visiblePendingApplicationData = searchedApplications.slice(0, visiblePendingApplication);

        const handleAcceptYouth = async (mapName, userIdentification, jobName, firstName, lastName, email) => {
            const userId = auth.currentUser.uid;
            const jobApproval = firestore.collection('jobsApproval').doc(userId);
            const neededId = userIdentification + mapName;

            //we create the job approval in the database
            const sentJobApproval = {
                jobName: jobName,
                firstName: firstName,
                lastName: lastName,
                email: email,
                userIdentification: userIdentification,
                mapName: mapName,
            };
            //here we add the youth to the list of approved youth
            await jobApproval.set({ [neededId]: sentJobApproval }, { merge: true });

            console.log('try to remove: ', mapName);
            //We remove the job
            const programRef = firestore.collection('jobs').doc(userId);
            await programRef.update({
                [mapName]: firebase.firestore.FieldValue.delete(),
            });
            handleRefuseYouth(mapName, userIdentification);
            //reload the page
            window.location.reload();
        };

        const handleRefuseYouth = async (mapName, userIdentification) => {
            try {
                const userId = auth.currentUser.uid;
                const applicationRef = firestore.collection('jobsApplication').doc(userId);
                const neededId = userIdentification + mapName;
                const removeField = firebase.firestore.FieldValue.delete();
                await applicationRef.update({
                    [neededId]: removeField,
                });
                //reload the page
                window.location.reload();
            } catch (error) {
                console.log('Error refusing youth:', error);
            }
        };

        return (
            <div>
                <div style={{ paddingTop: '15px' }}>
                    <div className="row mb-3">
                        <div className="col" style={{ paddingBottom: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-text">{t('search')}:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={searchApplicationQuery}
                                    onChange={handleSearchApplicationChange}
                                />
                            </div>
                        </div>
                    </div>
                    {visiblePendingApplicationData.length > 0 ? (
                        <ul className="list-group">
                            {visiblePendingApplicationData.map((pendingApplication) => (
                                <li key={pendingApplication.id} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('jobName')}: {pendingApplication.jobName}</h3>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('firstName')}:</b> {pendingApplication.firstName} {pendingApplication.lastName}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('email')}:</b> {pendingApplication.email}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('description')}:</b> {pendingApplication.information}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('coverLetter')}:</b> {pendingApplication.coverLetter}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-end">
                                            <button className="btn btn-primary" onClick={() => handleAcceptYouth(pendingApplication.mapName, pendingApplication.userIdentification, pendingApplication.jobName, pendingApplication.firstName, pendingApplication.lastName, pendingApplication.email)} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                                {t('accept')}
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => handleRefuseYouth(pendingApplication.mapName, pendingApplication.userIdentification)} style={{ backgroundColor: '#6C757D', borderColor: '#6C757D', marginLeft: '10px' }}>
                                                {t('decline')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="row-md-3 text-center" style={{ paddingBottom: '10px' }}>
                            <h3>{t('No pending application found')}</h3>
                        </div>
                    )}
                    {visiblePendingApplication < pendingApplication.length && (
                        <div className="text-center" style={{ paddingTop: '15px' }}>
                            <button className="btn btn-primary" onClick={handleLoadMoreApplications} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                {t('LoadMore')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    //View of youth profiles
    const renderYouthProfiles = () => {
        const visibleProfilesData = searchedProfiles.slice(0, visibleProfiles);


        return (

            <div style={{ paddingTop: '15px' }}>
                <div className="row mb-3">
                    <div className="col-md-9" style={{ paddingBottom: '10px' }}>
                        <div className="input-group">
                            <span className="input-group-text">{t('search')}:</span>
                            <input
                                type="text"
                                className="form-control"
                                value={searchYoungQuery}
                                onChange={handleSearchYoungChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                {t('filter')}:
                            </span>
                            <select
                                className="form-select"
                                value={filterYoungQuery}
                                onChange={handleFilterYoungChange}
                            >
                                <option value="">{t('all')}</option>
                                {existingSkills.map((skill) => (
                                    <option key={skill} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {visibleProfilesData.length > 0 ? (
                    <li className="list-group">
                        {visibleProfilesData.map((profile) => (
                            <li key={profile.id} className="list-group-item profile-item">
                                <div className="row">
                                    <h3>{t('fullName')}: {profile.firstName} {profile.lastName}</h3>
                                </div>
                                <div className="row">
                                    <div className="col">
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
                                            <div className="row">
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
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="text-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSeeMoreAbout(profile)}
                                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                        >
                                            {t('viewProfile')}
                                        </button>
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
        const visibleJobsData = searchedJobs.slice(0, visibleJobs);

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
                    <div className="row-md-3 text-center" style={{ paddingBottom: '10px' }}>
                        <button className="btn btn-primary" onClick={handleShowModal} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('CreateNewJob')}
                        </button>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-9" style={{ paddingBottom: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-text">{t('search')}:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={searchJobQuery}
                                    onChange={handleSearchJobChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    {t('filter')}:
                                </span>
                                <select
                                    className="form-select"
                                    value={filterJobQuery}
                                    onChange={handleFilterJobChange}
                                >
                                    <option value="">{t('all')}</option>
                                    <option value="jobBeginDate">{t('beginDate')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {visibleJobsData.length > 0 ? (
                        <li className="list-group">
                            {visibleJobsData.map((job) => (
                                <li key={job.id} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('jobName')}: {job.jobName}</h3>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-5" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('description')}:</b> {job.jobDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('location')}:</b> {job.jobLocation}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('beginDate')}:</b> {job.jobBeginDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('endDate')}:</b> {job.jobEndDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('position')}:</b> {job.jobPosition}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3">
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
                                <label className='form-label'>{t('description')}</label>
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
                                <label className='form-label'>{t('location')}</label>
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
                                <label className='form-label'>{t('beginDate')}</label>
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
                                <label className='form-label'>{t('endDate')}</label>
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
                                <label className='form-label'>{t('position')}</label>
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
                    <div className="col">
                        <button
                            onClick={() => handleViewSelect('pendingApplication')}
                            className="form-control"
                            style={{ border: selectedView === 'pendingApplication' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'pendingApplication' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('viewApplication')}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            onClick={() => handleViewSelect('approvedApplication')}
                            className="form-control"
                            style={{ border: selectedView === 'approvedApplication' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'approvedApplication' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('approvedApplications')}
                        </button>
                    </div>
                </div>
                {renderView()}
                {renderProfileModal()}
                {selectedView === 'youthProfiles' && visibleProfiles < searchedProfiles.length && (
                    <div className="text-center" style={{ paddingTop: '15px' }}>
                        <button className="btn btn-primary" onClick={handleLoadMoreYouth} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('LoadMoreYouthProfiles')}
                        </button>
                    </div>
                )}

                {selectedView === 'Job' && visibleJobs < searchedJobs.length && (
                    <div className="text-center" style={{ paddingTop: '15px' }}>
                        <button className="btn btn-primary" onClick={handleLoadMoreJobs} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('LoadMoreJobs')}
                        </button>
                    </div>
                )}

            </Container>
        </div>
    );
};

export default HomeCompany;