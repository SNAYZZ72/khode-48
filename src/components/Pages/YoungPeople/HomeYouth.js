import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { Modal, Button } from 'react-bootstrap';

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

    const fetchPrograms = async () => {
        try {
            const programsRef = firestore.collection('programs');
            const snapshot = await programsRef.get();
            const programList = [];
            snapshot.forEach((doc) => {
                const programData = doc.data();
                programList.push(programData);
            });
            setPrograms(programList);
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    const fetchJobs = async () => {
        try {
            const jobsRef = firestore.collection('jobs').doc('yourUserId'); // Replace 'yourUserId' with the appropriate user ID
            const doc = await jobsRef.get();
            if (doc.exists) {
                const userData = doc.data();
                const jobData = Object.values(userData);
                setJobs(jobData);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleSeeMoreProgram = (program) => {
        setSelectedProgram(program);
        setShowProgramModal(true);
    };

    const handleSeeMoreJob = (job) => {
        setSelectedJob(job);
        setShowJobModal(true);
    };

    const closeProgramModal = () => {
        setSelectedProgram(null);
        setShowProgramModal(false);
    };

    const closeJobModal = () => {
        setSelectedJob(null);
        setShowJobModal(false);
    };

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

    const handleSeeMore = (project) => {
        // Implement your logic here to handle "See More" button click
        console.log('See More clicked:', project);
    };

    return (
        <>
            <HeaderYouth />
            <div className="container">
                <h2>{t('Home youth')}</h2>

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

            {/* Program Modal */}
            <Modal show={showProgramModal} onHide={closeProgramModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProgram?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('Description')}: {selectedProgram?.description}</p>
                    <p>{t('Company')}: {selectedProgram?.company}</p>
                    {/* Add more program details as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeProgramModal}>
                        {t('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Job Modal */}
            <Modal show={showJobModal} onHide={closeJobModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedJob?.jobName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('Description')}: {selectedJob?.jobDescription}</p>
                    <p>{t('Location')}: {selectedJob?.jobLocation}</p>
                    {/* Add more job details as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeJobModal}>
                        {t('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HomeYouth;