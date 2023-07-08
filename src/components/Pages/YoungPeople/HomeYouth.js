import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { Modal, Button } from 'react-bootstrap';
import { firestore } from '../../firebase';

const HomeYouth = () => {
    const { t } = useTranslation();

    const [showPrograms, setShowPrograms] = useState(false);
    const [showJobs, setShowJobs] = useState(false);
    const [programs, setPrograms] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showProgramModal, setShowProgramModal] = useState(false);
    const [showJobModal, setShowJobModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        fetchPrograms();
        fetchJobs();
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

    const filteredPrograms = programs.filter((program) => {
        const title = program.title ?? '';
        const company = program.company ?? '';

        return (
            title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterQuery === '' || company === filterQuery)
        );
    }).filter(program => program.title || program.company); // Exclude empty programs

    return (
        <>
            <HeaderYouth />
            <div className="container">
                <h2>{t('Home youth')}</h2>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <button
                            className="form-control"
                            style={{ backgroundColor: showPrograms ? '#F24726' : '#6C757D', color: 'white' }}
                            onClick={() => setShowPrograms(!showPrograms)}
                        >
                            {t('Show Programs')}
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            className="form-control"
                            style={{ backgroundColor: showJobs ? '#F24726' : '#6C757D', color: 'white' }}
                            onClick={() => setShowJobs(!showJobs)}
                        >
                            {t('Show Jobs')}
                        </button>
                    </div>
                </div>

                {showPrograms && (
                    <>
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
                                        <option value="Programme A">ProgrammeA</option>
                                        <option value="Programme B">Programme B</option>
                                        <option value="Programme C">Programme C</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <h3>{t('Programs')}</h3>
                        {filteredPrograms.length > 0 ? (
                            <ul className="list-group">
                                {filteredPrograms.map((program) => (
                                    <li key={program.id} className="list-group-item">
                                        <h3>{program.title}</h3>
                                        <p>{t('Description')}: {program.description}</p>
                                        <p>{t('Company')}: {program.company}</p>
                                        {/* Add more program details as needed */}
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSeeMoreProgram(program)}
                                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                        >
                                            {t('See More')}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{t('No programs found.')}</p>
                        )}
                    </>
                )}

                {showJobs && (
                    <>
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
                                        <option value="Company A">Company A</option>
                                        <option value="Company B">Company B</option>
                                        <option value="Company C">Company C</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <h3>{t('Jobs')}</h3>
                        {jobs.length > 0 ? (
                            <ul className="list-group">
                                {jobs.map((job) => (
                                    <li key={job.id} className="list-group-item">
                                        <h3>{job.jobName}</h3>
                                        <p>{t('Description')}: {job.jobDescription}</p>
                                        <p>{t('Location')}: {job.jobLocation}</p>
                                        {/* Add more job details as needed */}
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleSeeMoreJob(job)}
                                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                        >
                                            {t('See More')}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>{t('No jobs found.')}</p>
                        )}
                    </>
                )}
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