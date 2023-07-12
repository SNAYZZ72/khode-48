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
    const [coverLetter, setCoverLetter] = useState('');
    const [pending, setPending] = useState(null);

    const [selectedProgram, setSelectedProgram] = useState(null);
    const [showProgramModal, setShowProgramModal] = useState(false);


    const handleProgramApplication = (program) => {
        setSelectedProgram(program);
        setShowProgramModal(true);
    };

    const handleCloseProgramModal = () => {
        setSelectedProgram(null);
        setShowProgramModal(false);
    };




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
        fetchCurrentUser();
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

    const handleCoverLetterChange = (event) => {
        setCoverLetter(event.target.value);
    };

    const [languageList, setLanguageList] = useState([
    ]);

    const [experienceList, setExperienceList] = useState([
    ]);

    const [youthFormData, setYouthFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        city: '',
        postalCode: '',
        education: '',
        information: '',
        listLanguages: languageList,
        listExperience: experienceList,
        phoneNumber: '',
        proactivity: 0,
        creativity: 0,
        initiative: 0,
        empathy: 0,
        leadership: 0,
        teamwork: 0,
    });

    //funciton to calculate age of the user based on the date of birth with format : yyyy-mm-dd
    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();

        // Check if the user hasn't had their birthday this year yet
        // If the current month and day are before the birth month and day,
        // subtract 1 from the age

        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    //function to get current user data
    const fetchCurrentUser = async () => {
        const userRef = firestore.collection('users').doc('usersyouth');
        const userDoc = await userRef.get();
        if (userDoc.exists) {
            const userData = userDoc.data()[auth.currentUser.uid];
            //setYouthFormData firstname, lastname, city
            setYouthFormData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                city: userData.city,
                postalCode: userData.postalCode,
                education: userData.educationalLevel,
                information: userData.information,
                age: calculateAge(userData.dateOfBirth),
                listLanguages: userData.listLanguages,
                listExperience: userData.listExperience,
                phoneNumber: userData.phoneNumber,
                proactivity: userData.proactivity,
                creativity: userData.creativity,
                initiative: userData.initiative,
                empathy: userData.empathy,
                leadership: userData.leadership,
                teamwork: userData.teamwork,
            });
            console.log('User Data:', userData);
        } else {
            console.log('No such document!');
        }
    };

    const handleSubmitApplication = async () => {
        if (coverLetter === '') {
            alert('Please enter a cover letter');
            return;
        }
        try {
            const programsRef = firestore.collection('programs');
            const snapshot = await programsRef.get();
            let matchingProgramFound = false;

            for (const doc of snapshot.docs) {
                const programData = Object.values(doc.data())[0]; // Retrieve the program information

                // Check if the program information matches the selected program
                if (
                    programData.companyName === selectedProgram.companyName &&
                    programData.endDate === selectedProgram.endDate &&
                    programData.numberOfPlaces === selectedProgram.numberOfPlaces &&
                    programData.programDescription === selectedProgram.programDescription &&
                    programData.programName === selectedProgram.programName &&
                    arraysEqual(programData.skillsDeveloped, selectedProgram.skillsDeveloped) &&
                    programData.startDate === selectedProgram.startDate
                ) {
                    matchingProgramFound = true;
                    const docName = doc.id; //uid of the intermediary document
                    const mapName = Object.keys(doc.data())[0]; // Retrieve the matching map name

                    //we fetched the current user data with the function fetchCurrentUser, now we can use the data to create the application
                    console.log('Youth Form Data:', youthFormData);
                    //create application object
                    const sentApplication = {
                        programName: selectedProgram.programName,
                        firstName: youthFormData.firstName,
                        lastName: youthFormData.lastName,
                        email: youthFormData.email,
                        age: youthFormData.age,
                        city: youthFormData.city,
                        information: youthFormData.information,
                        education: youthFormData.education,
                        coverLetter: coverLetter,
                        pending: pending,
                        mapName: mapName,
                        userIdentification: auth.currentUser.uid,
                    };

                    const uid = auth.currentUser.uid;

                    const checkRef = firestore.collection('programsApplication').doc(docName);

                    const checkDoc = await checkRef.get();
                    if (!checkDoc.exists) {
                        await checkRef.set({});
                    }

                    // Write the application to the appropriate document and subcollection
                    //we store the application in a collection called programsApplication then to make sorting easier
                    const applicationsRef = firestore.collection('programsApplication').doc(docName);

                    console.log('docName :', docName);
                    // we combine current uid with map name to create a unique id for the application
                    const applicationId = uid + mapName;
                    console.log('Application ID:', applicationId);

                    // Check if the user has already applied
                    const userDoc = await applicationsRef.get();
                    const userData = await userDoc.data()[applicationId];

                    if (userData !== undefined) {
                        // User has already applied, show a message or handle accordingly
                        alert('You have already applied to this program.');
                        return;
                    }

                    // User has not applied, add the application
                    await applicationsRef
                        .set({ [applicationId]: sentApplication }, { merge: true })
                        .then(() => {
                            alert('Application added successfully');
                            handleCloseProgramModal();
                            // Reload the page
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.error('Error adding application:', error);
                        });

                    return;
                }
            }

            if (!matchingProgramFound) {
                // No matching program found, display an error message or handle it accordingly
                alert('Please try again.');
                return;
            }
        } catch (error) {
            console.error('Error handling application:', error);
        }
    };


    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    const renderProgramView = () => {
        const visibleProgramsData = searchedPrograms.slice(0, visiblePrograms);

        return (
            <div>
                <div style={{ paddingTop: '15px' }}>
                    <div className="row mb-3">
                        <div className="col-md-9" style={{ paddingBottom: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-text">{t('search')}:</span>
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
                                    {t('filter')}:
                                </span>
                                <select
                                    className="form-select"
                                    value={filterQuery}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">{t('all')}</option>
                                    <option value="startDate">{t('beginDate')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {visibleProgramsData.length > 0 ? (
                        <li className="list-group">
                            {visibleProgramsData.map((program) => (
                                <li key={program.id} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('programName')}: {program.programName}</h3>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-md-6" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('description')}:</b> {program.programDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('Company name')}:</b> {program.companyName}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('beginDate')}:</b> {program.startDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('endDate')}:</b> {program.endDate}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('numberOfPlaces')}:</b> {program.numberOfPlaces}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('skillsDeveloped')}:</b> {program.skillsDeveloped.join(', ')}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-end">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleProgramApplication(program)}
                                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                            >
                                                {t('apply')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </li>
                    ) : (
                        <p>{t('No programs found.')}</p>
                    )}

                    {/* Program Modal */}
                    <Modal show={showProgramModal} onHide={handleCloseProgramModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{t('programApplication')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedProgram && (
                                <div>
                                    <h4>{t('Program Name')}: {selectedProgram.programName}</h4>
                                    <h4>{t('Company Name')}: {selectedProgram.companyName}</h4>

                                    <div className="form-group">
                                        <label htmlFor="coverLetter">{t('Cover Letter')}</label>
                                        <textarea
                                            className="form-control"
                                            id="coverLetter"
                                            rows="4"
                                            value={coverLetter}
                                            onChange={handleCoverLetterChange}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleSubmitApplication}>
                                {t('Apply')}
                            </Button>
                            <Button variant="secondary" onClick={handleCloseProgramModal}>
                                {t('Close')}
                            </Button>
                        </Modal.Footer>
                    </Modal>

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
                                <span className="input-group-text">{t('search')}:</span>
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
                                    {t('filter')}:
                                </span>
                                <select
                                    className="form-select"
                                    value={filterQuery}
                                    onChange={handleFilterChange}
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
                                                        <p><b>{t('Company name')}:</b> {job.companyName}</p>
                                                    </div>
                                                </li>
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
                                    <div className="row">
                                        <div className="text-end">
                                            <button
                                                className="btn btn-primary"
                                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                            >
                                                {t('apply')}
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
                            {t('showJobs')}
                        </button>
                    </div>
                </div>
                {renderView()}
            </Container >
        </div >
    );
};

export default HomeYouth;
