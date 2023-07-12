import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../../common/Header/HeaderIntermediary';
import { auth, firestore } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Container } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import { map } from 'leaflet';


const availableSkills = [
    'Proactivity',
    'Creativity',
    'Initiative',
    'Empathy',
    'Leadership',
    'Teamwork',
];

const HomeIntermediary = () => {
    const { t } = useTranslation();
    const [profileType, setProfileType] = useState('');
    const [searchProgramQuery, setSearchProgramQuery] = useState('');
    const [filterProgramQuery, setFilterProgramQuery] = useState('');
    const [searchApplicationQuery, setSearchApplicationQuery] = useState('');
    const [filterApplicationQuery, setFilterApplicationQuery] = useState('');
    const [searchApprovedApplicationQuery, setSearchApprovedApplicationQuery] = useState('');
    const [filterApprovedApplicationQuery, setFilterApprovedApplicationQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedView, setSelectedView] = useState('programView');
    const [userPrograms, setUserPrograms] = useState([]);
    const [visiblePrograms, setVisiblePrograms] = useState(10); // Number of jobs to display
    const [userApplications, setUserApplications] = useState([]);
    const [visibleApplications, setVisibleApplications] = useState(10); // Number of applications to display
    const [youthUid, setYouthUid] = useState('');
    const [visibleApprovedApplications, setVisibleApprovedApplications] = useState(10);
    const [userApprovedApplications, setUserApprovedApplications] = useState([]);



    const [createProgram, setCreateProgram] = useState({
        programName: '',
        programDescription: '',
        skillsDeveloped: [],
        startDate: '',
        endDate: '',
        numberOfPlaces: 0,
    });

    const handleSearchProgramChange = (event) => {
        setSearchProgramQuery(event.target.value);
    };

    const handleFilterProgramChange = (event) => {
        setFilterProgramQuery(event.target.value);
    };

    const handleSearchApplicationChange = (event) => {
        setSearchApplicationQuery(event.target.value);
    };

    const handleFilterApplicationChange = (event) => {
        setFilterApplicationQuery(event.target.value);
    };

    const handleSearchApprovedApplicationChange = (event) => {
        setSearchApprovedApplicationQuery(event.target.value);
    };

    const handleFilterApprovedApplicationChange = (event) => {
        setFilterApprovedApplicationQuery(event.target.value);
    };

    const filterPrograms = () => {
        if (filterProgramQuery === '') {
            return userPrograms;
        }

        const selectedDate = filterProgramQuery;

        return userPrograms
            .filter((program) => program[selectedDate] !== undefined)
            .sort((a, b) => {
                const aDate = new Date(a[selectedDate]);
                const bDate = new Date(b[selectedDate]);

                if (selectedDate === 'startDate') {
                    return aDate - bDate; // Tri de la plus proche à la plus lointaine
                } else {
                    return 0; // Pour le cas de la clé 'jobEndDate', aucun tri n'est effectué
                }
            });
    };

    const searchedPrograms = filterPrograms().filter((program) =>
        program.programName.toLowerCase().includes(searchProgramQuery.toLowerCase())
    );

    //search by programName or by name of youth people

    const searchedApplications = userApplications.filter((application) =>
        application.programName.toLowerCase().includes(searchApplicationQuery.toLowerCase())

    );

    const searchedApprovedApplications = userApprovedApplications.filter((application) =>
        application.programName.toLowerCase().includes(searchApprovedApplicationQuery.toLowerCase())
    );

    const handleProfileSelect = (type) => {
        setProfileType(type);
        setShowModal(true);
    };

    //load more programs
    const handleLoadMorePrograms = () => {
        // Increase the number of visible programs when the "Load More" button is clicked *useful so the website doesn't crash when loading too many jobs*
        setVisiblePrograms((prevVisiblePrograms) => prevVisiblePrograms + 10);
    };

    //load more applications
    const handleLoadMoreApplications = () => {
        // Increase the number of visible applications when the "Load More" button is clicked *useful so the website doesn't crash when loading too many jobs*
        setVisibleApplications((prevVisibleApplications) => prevVisibleApplications + 10);
    };

    //load more approved applications
    const handleLoadMoreApprovedApplications = () => {
        // Increase the number of visible applications when the "Load More" button is clicked *useful so the website doesn't crash when loading too many jobs*
        setVisibleApprovedApplications((prevVisibleApprovedApplications) => prevVisibleApprovedApplications + 10);
    };

    useEffect(() => {
        fetchUserPrograms();
        fetchUserApplications();
        fetchUserApprovedApplications();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateProgram((prevCreateProgram) => ({
            ...prevCreateProgram,
            [name]: value,
        }));
    };

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSkillChange = (event) => {
        const skill = event.target.value;
        if (event.target.checked) {
            // Add the skill to the selected skills if it's checked
            setSelectedSkills((prevSkills) => [...prevSkills, skill]);
        } else {
            // Remove the skill from the selected skills if it's unchecked
            setSelectedSkills((prevSkills) =>
                prevSkills.filter((prevSkill) => prevSkill !== skill)
            );
        }
    };

    const renderSkillOptions = () => {
        return availableSkills.map((skill) => (
            <label key={skill}>
                <input
                    type="checkbox"
                    value={skill}
                    //design for checkbox with className from bootstrap
                    className="form-check-input"
                    //style for checkbox padding or margin on each checkbox
                    style={{ marginRight: '5px', marginLeft: '20px' }}
                    checked={selectedSkills.includes(skill)}
                    onChange={handleSkillChange}
                />
                {skill}
            </label>
        ));
    };

    // This function allow to search a user based on his email

    const [email, setEmail] = useState(''); // Email of the user to search
    const [name, setName] = useState(''); // Name of the user to change as a test
    const [proactivity, setProactivity] = useState(0);
    const [creativity, setCreativity] = useState(0);
    const [initiative, setInitiative] = useState(0);
    const [empathy, setEmpathy] = useState(0);
    const [leadership, setLeadership] = useState(0);
    const [teamwork, setTeamwork] = useState(0);


    const searchUserByEmail = async (userEmail, proactivity, creativity, initiative, empathy, leadership, teamwork) => {
        try {
            console.log('Searching for user with email:', userEmail);
            const usersRef = firestore.collection('users').doc('usersyouth');
            const userDoc = await usersRef.get();

            if (userDoc.exists) {
                const userData = userDoc.data();

                // Iterate over each mapping in the document
                for (const key in userData) {
                    if (userData.hasOwnProperty(key)) {
                        const mapping = userData[key];

                        // Check if the email matches
                        if (mapping.email === userEmail) {
                            // User found, retrieve the UID
                            const uid = key;

                            const updateObject = {};

                            const updateAttribute = (attributeName, attributeValue) => {
                                if (attributeValue) {
                                    const updatedAttribute = parseInt(mapping[attributeName] || 0) + parseInt(attributeValue);
                                    updateObject[`${uid}.${attributeName}`] = updatedAttribute;
                                }
                            };

                            // Update the number of points for each attribute
                            updateAttribute('proactivity', proactivity);
                            updateAttribute('creativity', creativity);
                            updateAttribute('initiative', initiative);
                            updateAttribute('empathy', empathy);
                            updateAttribute('leadership', leadership);
                            updateAttribute('teamwork', teamwork);

                            if (Object.keys(updateObject).length > 0) {
                                await usersRef
                                    .update(updateObject)
                                    .then(() => console.log('User attributes updated successfully.'))
                                    .catch((error) => console.log('Error updating user attributes:', error));
                            } else {
                                console.log('No attributes to update.');
                            }

                            //reload the page
                            alert('Points added successfully.');
                            window.location.reload();
                            return;
                        }
                    }
                }
                alert('User not found.');
            } else {
                // Document does not exist
                console.log('Document does not exist.');
            }
        } catch (error) {
            console.log('Error searching for user:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //if add points is clicked
        if (selectedView === 'addPoints') {
            await searchUserByEmail(email, proactivity, creativity, initiative, empathy, leadership, teamwork);
            return;
        }


        //if create program is clicked
        if (selectedView === 'programView') {


            if (selectedSkills.length === 0) {
                alert('Please select at least one skill.');
                return;
            }

            const currentDate = new Date();
            const startDate = new Date(createProgram.startDate);
            const endDate = new Date(createProgram.endDate);

            if (startDate < currentDate) {
                alert('Start date cannot be in the past.');
                return;
            }

            if (endDate < startDate) {
                alert('End date cannot be before start date.');
                return;
            }

            if (createProgram.numberOfPlaces < 1) {
                alert('Number of places must be greater than 0.');
                return;
            }

            // Generate a random map name
            const mapName = uuidv4();


            //get the right path
            const userId = auth.currentUser.uid;
            const parentDocRef = firestore.collection('programs').doc(userId);
            const programId = parentDocRef.id;


            //get the name of the current company
            const companyRef = firestore.collection('users').doc('usersintermediary');
            const userDoc = await companyRef.get();
            const userData = userDoc.data()[userId];



            // Create a new program inFirebase
            const sentProgram = {
                programName: createProgram.programName,
                programDescription: createProgram.programDescription,
                skillsDeveloped: selectedSkills, // Update with selected skills
                startDate: createProgram.startDate,
                endDate: createProgram.endDate,
                numberOfPlaces: createProgram.numberOfPlaces,
                companyName: userData.companyName,
                mapName: mapName,
            };

            // Add a new program to the programs collection
            await parentDocRef.set({ [mapName]: sentProgram }, { merge: true });

            //here we are resetting the form
            setCreateProgram({
                programName: '',
                programDescription: '',
                skillsDeveloped: [],
                startDate: '',
                endDate: '',
                numberOfPlaces: 0,
                mapName: '',
            });

            alert('Program created successfully!');
            window.location.reload();
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleViewSelect = (view) => {
        setSelectedView(view);
    };

    const renderView = () => {
        if (selectedView === 'programView') {
            return renderProgramView();
        } else if (selectedView === 'addPoints') {
            return renderAddPoints();
        } else if (selectedView === 'viewApplications') {
            return renderViewApplication();
        } else if (selectedView === 'approvedApplications') {
            return renderApprovedApplication();
        }
    };

    //Here we are fetching the programs from the database
    const fetchUserPrograms = async () => {
        const userId = auth.currentUser.uid;
        const programsRef = firestore.collection('programs').doc(userId);
        const doc = await programsRef.get();
        if (doc.exists) {
            const userData = doc.data();
            const programs = Object.values(userData);
            setUserPrograms(programs);
        }
    };
    const fetchUserApplications = async () => {
        try {
            const userId = auth.currentUser.uid;
            const applicationsRef = firestore.collection('programsApplication').doc(userId);
            const doc = await applicationsRef.get();
            if (doc.exists) {
                const userData = doc.data();
                const applications = Object.values(userData);
                setUserApplications(applications);
            }
        } catch (error) {
            console.error('Error fetching user applications:', error);
        }
    };

    const fetchUserApprovedApplications = async () => {
        try {
            const userId = auth.currentUser.uid;
            const approvedRef = firestore.collection('programsApproval').doc(userId);
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

    const renderApprovedApplication = () => {
        const visibleApprovalData = searchedApprovedApplications.slice(0, visibleApprovedApplications);
        console.log('visibleApprovalData: ', visibleApprovalData);

        //here a function able to delete an approved application. Can be useful to sort the approved applications or to cancel an approved application
        const deleteApprovedApplication = async (userIdentification, mapName) => {
            try {
                const userId = auth.currentUser.uid;
                const approvedRef = firestore.collection('programsApproval').doc(userId);
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
                    {visibleApprovalData.length > 0 ? (
                        <li className="list-group">
                            {visibleApprovalData.map((approved) => (
                                <li key={approved.id} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('programName')}: {approved.programName}</h3>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('firstName')}:</b> {approved.name} {approved.lastname}</p>
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
                        </li>
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

    const renderViewApplication = () => {
        const visibleApplicationsData = searchedApplications.slice(0, visibleApplications);

        const handleAcceptYouth = async (mapName, userIdentification, programName, firstName, lastName, email) => {
            // Handle accepting the youth with the specific mapName
            const userId = auth.currentUser.uid;
            const applicationApproval = firestore.collection('programsApproval').doc(userId);
            const neededId = userIdentification + mapName;
            //we create the field that will be added to the list of approved youth
            const addYouth = {
                programName: programName,
                name: firstName,
                lastname: lastName,
                email: email,
                userIdentification: userIdentification,
                mapName: mapName,
            }
            //here we add the youth to the list of approved youth
            await applicationApproval.set({ [neededId]: addYouth }, { merge: true });
            //alert('Youth accepted successfully.');

            //we will remove 1 place from the number of places available and if the number of places available is 0, we will delete the program.
            const programRef = firestore.collection('programs').doc(userId);
            const userDoc = await programRef.get();
            const userData = userDoc.data()[mapName];
            //we remove 1 from variable numberOfPlaces
            await programRef.update({
                [mapName]: {
                    ...userData,
                    numberOfPlaces: userData.numberOfPlaces - 1,
                },
            });
            //we check if the number of places is 0
            if (userData.numberOfPlaces === 1) {
                //we delete the program
                await programRef.update({
                    [mapName]: firebase.firestore.FieldValue.delete(),
                });
            }
            //here we delete the youth from the list of applications
            handleRefuseYouth(mapName, userIdentification);
            //reload the page
            window.location.reload();
        };


        const handleRefuseYouth = async (mapName, userIdentification) => {
            try {
                const userId = auth.currentUser.uid;
                const applicationRef = firestore.collection('programsApplication').doc(userId);
                const neededId = userIdentification + mapName;
                const removeField = firebase.firestore.FieldValue.delete();
                await applicationRef.update({
                    [neededId]: removeField,
                });
                alert('Youth refused successfully.');
                window.location.reload();
            } catch (error) {
                console.error('Error refusing youth:', error);
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
                    {visibleApplicationsData.length > 0 ? (
                        <li className="list-group">
                            {visibleApplicationsData.map((application) => (
                                <li key={application.programId} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('programName')}: {application.programName}</h3>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('firstName')}:</b> {application.firstName} {application.lastName}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('email')}:</b> {application.email}</p>
                                                    </div>
                                                </li>
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('description')}:</b> {application.information}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('coverLetter')}:</b> {application.coverLetter}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="text-end">
                                            <button className="btn btn-primary" onClick={() => handleAcceptYouth(application.mapName, application.userIdentification, application.programName, application.firstName, application.lastName, application.email)} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                                {t('accept')}
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => handleRefuseYouth(application.mapName, application.userIdentification)} style={{ backgroundColor: '#6C757D', borderColor: '#6C757D', marginLeft: '10px' }}>
                                                {t('decline')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </li>
                    ) : (
                        <div className="row-md-3 text-center" style={{ paddingBottom: '10px' }}>
                            <h3>No applications found.</h3>
                        </div>
                    )}
                    {visibleApplications < userApplications.length && (
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

    const renderProgramView = () => {
        const visibleProgramsData = searchedPrograms.slice(0, visiblePrograms);

        //function to delete a program
        const handleDeleteProgram = async (mapName) => {
            try {
                const userId = auth.currentUser.uid;
                const programRef = firestore.collection('programs').doc(userId);
                const removeField = firebase.firestore.FieldValue.delete();
                await programRef.update({
                    [mapName]: removeField,
                });
                alert('Program deleted successfully.');
                window.location.reload();
            } catch (error) {
                console.error('Error deleting program:', error);
            }
        };

        return (
            <div>
                <div style={{ paddingTop: '15px' }}>
                    <div className="row-md-3 text-center" style={{ paddingBottom: '10px' }}>
                        <button className="btn btn-primary" onClick={handleShowModal} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('CreateNewProgram')}
                        </button>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-9" style={{ paddingBottom: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-text">{t('search')}:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={searchProgramQuery}
                                    onChange={handleSearchProgramChange}
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
                                    value={filterProgramQuery}
                                    onChange={handleFilterProgramChange}
                                >
                                    <option value="">{t('all')}</option>
                                    <option value="startDate">{t('beginDate')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {visibleProgramsData.length > 0 ? (
                        <ul className="list-group">
                            {visibleProgramsData.map((program) => (
                                <li key={program.programId} className="list-group-item profile-item">
                                    <div className="row">
                                        <h3>{t('programName')}: {program.programName}</h3>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-7" style={{ paddingBottom: '20px' }}>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>{t('description')}:</b> {program.programDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-5">
                                            <ul className="list-group">
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
                                            <button className="btn btn-primary" onClick={() => handleDeleteProgram(program.mapName)} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                                {t('deleteProgram')}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No programs found.</p>
                    )}
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('CreateNewProgram')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">{t('programName')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="programName"
                                    name="programName"
                                    value={createProgram.programName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('description')}</label>
                                <textarea
                                    className="form-control"
                                    id="programDescription"
                                    name="programDescription"
                                    value={createProgram.programDescription}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('skillsDeveloped')}</label>
                                <div>{renderSkillOptions()}</div>
                                <div style={{ paddingTop: '10px' }}>
                                    {t('selectedSkills')}:
                                </div>
                                <ul className="list-group">
                                    {selectedSkills.map((skill, index) => (
                                        <li key={index} className="list-group-item">{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('beginDate')}</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    name="startDate"
                                    value={createProgram.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('endDate')}</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    name="endDate"
                                    value={createProgram.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('numberOfPlaces')}</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numberOfPlaces"
                                    name="numberOfPlaces"
                                    value={createProgram.numberOfPlaces}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('programCreate')}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
                {visiblePrograms < userPrograms.length && (
                    <div className="text-center" style={{ paddingTop: '15px' }}>
                        <button className="btn btn-primary" onClick={handleLoadMorePrograms} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                            {t('LoadMore')}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderAddPoints = () => {
        return (
            <div style={{ paddingTop: '15px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('proactivity')}:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="proactivityInput"
                                value={proactivity}
                                onChange={(e) => setProactivity(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>{t('creativity')}:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="creativityInput"
                                value={creativity}
                                onChange={(e) => setCreativity(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>{t('initiative')}:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="initiativeInput"
                                value={initiative}
                                onChange={(e) => setInitiative(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>{t('empathy')}:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="empathyInput"
                                value={empathy}
                                onChange={(e) => setEmpathy(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>{t('leadership')}:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="leadershipInput"
                                value={leadership}
                                onChange={(e) => setLeadership(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <label>{t('teamwork')}:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="teamworkInput"
                                value={teamwork}
                                onChange={(e) => setTeamwork(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>{t('addPoints')}</button>
                    </div>
                </form>
            </div>
        );
    };

    return (
        <div>
            <HeaderIntermediary />
            <Container>
                <div className="row mb-3">
                    <div className="col">
                        {/* borderColor: '#F24726' si la vue programView est actif sinon borderColor: 'none' */}
                        <button
                            onClick={() => handleViewSelect('programView')}
                            className="form-control"
                            style={{ border: selectedView === 'programView' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'programView' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('programView')}
                        </button>
                    </div>
                    <div className="col">
                        {/* borderColor: '#F24726' si la vue addPoints est actif sinon borderColor: 'none' */}
                        <button
                            onClick={() => handleViewSelect('addPoints')}
                            className="form-control"
                            style={{ border: selectedView === 'addPoints' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'addPoints' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('addPoints')}
                        </button>
                    </div>
                    <div className="col">
                        {/* borderColor: '#F24726' si la vue viewApplication est actif sinon borderColor: 'none' */}
                        <button
                            onClick={() => handleViewSelect('viewApplications')}
                            className="form-control"
                            style={{ border: selectedView === 'viewApplications' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'viewApplications' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('viewApplication')}
                        </button>
                    </div>
                    <div className="col">
                        {/* borderColor: '#F24726' si la vue createProgram est actif sinon borderColor: 'none' */}
                        <button
                            onClick={() => handleViewSelect('approvedApplications')}
                            className="form-control"
                            style={{ border: selectedView === 'approvedApplications' ? '3px solid #F24726' : '3px solid #6C757D', backgroundColor: selectedView === 'approvedApplications' ? '#F24726' : '#6C757D', color: 'white' }}
                        >
                            {t('approvedApplications')}
                        </button>
                    </div>
                </div>
                {renderView()}
            </Container>
        </div>
    );
};

export default HomeIntermediary;
