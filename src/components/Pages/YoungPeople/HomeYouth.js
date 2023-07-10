import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { Modal, Button, Container } from 'react-bootstrap';
import { auth, firestore } from '../../firebase';

const existingSkills = [
    'Proactivity',
    'Creativity',
    'Initiative',
    'Empathy',
    'Leadership',
    'Teamwork',
];

const HomeYouth = () => {
    const { t } = useTranslation();

    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [userPrograms, setUserPrograms] = useState([]);
    const [userJobs, setUserJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedView, setSelectedView] = useState('programView');
    const [visibleJobs, setVisibleJobs] = useState(10); // Number of jobs to display
    const [visiblePrograms, setVisiblePrograms] = useState(10); // Number of jobs to display



    // Fetch all programs from the database
    const fetchAllPrograms = async () => {
        const programsRef = firestore.collection('programs');
        const snapshot = await programsRef.get();
        const programs = [];

        snapshot.forEach((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const intermediaryPrograms = Object.values(userData);
                programs.push(...intermediaryPrograms);
            }
            else {
                console.log('No such document!');
            }
        });

        setUserPrograms(programs);
    };

    // Fetch all jobs from the database
    const fetchAllJobs = async () => {
        const jobsRef = firestore.collection('jobs');
        const snapshot = await jobsRef.get();
        const jobs = [];

        snapshot.forEach((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const companyJobs = Object.values(userData);
                jobs.push(...companyJobs);
            }
            else {
                console.log('No such document!');
            }
        });
        setUserJobs(jobs);
    };

    useEffect(() => {
        fetchAllPrograms();
        fetchAllJobs();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };

    const handleViewSelect = (view) => {
        setSelectedView(view);
    };

    const filterJobs = () => {
        if (filterQuery === '') {
            return userJobs;
        }

        const selectedDate = filterQuery;

        return userJobs
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
        job.jobName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const filterPrograms = () => {
        if (filterQuery === '') {
            return userPrograms;
        }

        const selectedDate = filterQuery;

        return userPrograms
            .filter((program) => program[selectedDate] !== undefined)
            .sort((a, b) => {
                const aDate = new Date(a[selectedDate]);
                const bDate = new Date(b[selectedDate]);

                if (selectedDate === 'startDate') {
                    return aDate - bDate; // Tri de la plus proche à la plus lointaine
                } else {
                    return 0; // Pour le cas de la clé 'programEndDate', aucun tri n'est effectué
                }
            });
    };

    const searchedPrograms = filterPrograms().filter((program) =>
        program.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //load more jobs 
    const handleLoadMoreJobs = () => {
        // Increase the number of visible jobs when the "Load More" button is clicked *useful so the website doesn't crash when loading too many jobs*
        setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 10);
    };

    //load more programs
    const handleLoadMorePrograms = () => {
        // Increase the number of visible programs when the "Load More" button is clicked *useful so the website doesn't crash when loading too many jobs*
        setVisiblePrograms((prevVisiblePrograms) => prevVisiblePrograms + 10);
    };

    const renderView = () => {
        if (selectedView === 'programView') {
            return renderProgramView();
        } else if (selectedView === 'jobView') {
            return renderJobView();
        }
    };

    const renderProgramView = () => {
        const visibleProgramsData = searchedPrograms.slice(0, visiblePrograms);

        return (
            <div>
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
                                    <option value="startDate">{t('Begin Date')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {visibleProgramsData.length > 0 ? (
                        <li className="list-group">
                            {visibleProgramsData.map((program) => (
                                <li key={program.id} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>Name: {program.programName}</h3>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>Description:</b> {program.programDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>Company Name:</b> {program.companyName}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>Start Date:</b> {program.startDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>End Date:</b> {program.endDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>Number of Places:</b> {program.numberOfPlaces}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>Skills Developed:</b> {program.skillsDeveloped.join(', ')}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-end">
                                            <button
                                                className="btn btn-primary"
                                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                            >
                                                {t('Apply')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </li>
                    ) : (
                        <p>{t('No programs found.')}</p>
                    )}

                    {/* Show the "Load More" button if there are more programs to load */}
                    {visiblePrograms < userPrograms.length && (
                        <div className="text-center" style={{ paddingTop: '15px' }}>
                            <button
                                onClick={handleLoadMorePrograms}
                                className="btn btn-primary"
                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                            >
                                {t('loadMore')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderJobView = () => {
        const visibleJobsData = searchedJobs.slice(0, visibleJobs);

        return (
            <div>
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
                                                        <p><b>{t('jobDescription')}:</b> {job.jobDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobCompanyName')}:</b> {job.companyName}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('jobLocation')}:</b> {job.jobLocation}</p>
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
                                                        <p><b>{t('jobPosition')}:</b> {job.jobPosition}</p>
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
                                    <div className="row">
                                        <div className="text-end">
                                            <button
                                                className="btn btn-primary"
                                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                            >
                                                {t('Apply')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </li>
                    ) : (
                        <p>{t('No jobs found.')}</p>
                    )}

                    {/* Show the "Load More" button if there are more jobs to load */}
                    {visibleJobs < userJobs.length && (
                        <div className="text-center" style={{ paddingTop: '15px' }}>
                        <button
                            onClick={handleLoadMoreJobs}
                            className="btn btn-primary"
                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                        >
                            {t('loadMore')}
                        </button>
                    </div>
                    )}
                </div>
            </div>
        );
    };


    return (
        <div>
            <HeaderYouth />
            <Container>
                <div className="row mb-3">
                    <div className="col">
                        <button
                            onClick={() => handleViewSelect('programView')}
                            className="form-control"
                            style={{ border: selectedView === 'programView' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'programView' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('programView')}
                        </button>
                    </div>
                    <div className="col">
                        <button
                            onClick={() => handleViewSelect('jobView')}
                            className="form-control"
                            style={{ border: selectedView === 'jobView' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'jobView' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('jobView')}
                        </button>
                    </div>
                </div>
                {renderView()}
            </Container >
        </div >
    );
};

export default HomeYouth;
