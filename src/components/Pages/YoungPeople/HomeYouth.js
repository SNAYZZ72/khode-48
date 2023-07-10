import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { Modal, Button } from 'react-bootstrap';
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

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterQuery === '' || project.company === filterQuery)
    );

    const handleViewSelect = (view) => {
        setSelectedView(view);
    };

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
        const visibleProgramsData = userPrograms.slice(0, visiblePrograms);

        return (
            <div>
                {visibleProgramsData.length > 0 ? (
                    <ul>
                        {visibleProgramsData.map((program) => (
                            <li key={program.id}>
                                <h3>{t('companyName')}: {program.companyName}</h3>
                                <p>{t('programName')}: {program.programName}</p>
                                <p>{t('programDescription')}: {program.programDescription}</p>
                                <p>{t('startData')}: {program.startDate}</p>
                                <p>{t('endDate')}: {program.endDate}</p>
                                <p>{t('numberOfPlace')}: {program.numberOfPlaces}</p>
                                <p>{t('skillsDeveloped')}: {program.skillsDeveloped.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('No programs found.')}</p>
                )}

                {/* Show the "Load More" button if there are more programs to load */}
                {visiblePrograms < userPrograms.length && (
                    <button onClick={handleLoadMorePrograms}>{t('loadMore')}</button>
                )}
            </div>
        );
    };

    const renderJobView = () => {
        const visibleJobsData = userJobs.slice(0, visibleJobs);

        return (
            <div>
                {visibleJobsData.length > 0 ? (
                    <ul>
                        {visibleJobsData.map((job) => (
                            <li key={job.id}>
                                <h3>{t('companyName')}: {job.companyName}</h3>
                                <p>{t('jobName')}: {job.jobName}</p>
                                <p>{t('jobDescription')}: {job.jobDescription}</p>
                                <p>{t('startData')}: {job.jobBeginDate}</p>
                                <p>{t('endDate')}: {job.jobEndDate}</p>
                                <p>{t('location')}: {job.jobLocation}</p>
                                <p>{t('positionSought')}: {job.jobPosition}</p>
                                <p>{t('skillsNeeded')}: </p>
                                {job.jobSkills.map((points, index) => (
                                    <p key={existingSkills[index]}>
                                        {t(existingSkills[index])}: {points}
                                    </p>
                                ))}

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('No jobs found.')}</p>
                )}

                {/* Show the "Load More" button if there are more jobs to load */}
                {visibleJobs < userJobs.length && (
                    <button onClick={handleLoadMoreJobs}>{t('loadMore')}</button>
                )}
            </div>
        );
    };


    return (
        <>
            <HeaderYouth />
            <div className="container">
                <h2>{t('Projects')}</h2>

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
                            <span className="input-group-text">{t('Filter')}:</span>
                            <select
                                className="form-select"
                                value={filterQuery}
                                onChange={handleFilterChange}
                            >
                                <option value="">{t('All')}</option>

                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="view-selector">
                        <button onClick={() => handleViewSelect('programView')}>
                            {t('programView')}
                        </button>
                        <button onClick={() => handleViewSelect('jobView')}>
                            {t('jobView')}
                        </button>
                    </div>
                    {renderView()}
                </div>
            </div>
        </>
    );
};

export default HomeYouth;
