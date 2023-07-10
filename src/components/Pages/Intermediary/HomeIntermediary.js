import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../../common/Header/HeaderIntermediary';
import { auth, firestore } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Container } from 'react-bootstrap';

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
    const [showModal, setShowModal] = useState(false);
    const [selectedView, setSelectedView] = useState('programView');
    const [userPrograms, setUserPrograms] = useState([]);

    const [createProgram, setCreateProgram] = useState({
        programName: '',
        programDescription: '',
        skillsDeveloped: [],
        startDate: '',
        endDate: '',
        numberOfPlaces: '',
    });

    const handleProfileSelect = (type) => {
        setProfileType(type);
        setShowModal(true);
    };

    useEffect(() => {
        fetchUserPrograms();
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
                numberOfPlaces: '',
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
            const userData = doc.data();
            const programs = Object.values(userData);
            setUserPrograms(programs);
        }
    };


    const renderProgramView = () => {
        return (
            <div>
                <div style={{ paddingTop: '15px' }}>
                    <div className="row mb-3">
                        <div className="col-md-2 text-center" style={{ paddingBottom: '10px' }}>
                            <button className="btn btn-primary" onClick={handleShowModal} style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>
                                {t('CreateNewProgram')}
                            </button>
                        </div>
                        <div className="col-md-8" style={{ paddingBottom: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-text">{t('Search')}:</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    onChange=""
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
                                    value=""
                                    onChange=""
                                >
                                    <option value="">{t('All')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {userPrograms.length > 0 ? (
                        <li className="list-group">
                            {userPrograms.map((program) => (
                                <li key={program.programId} className="list-group-item profile-item">
                                    <div className="row mb-3">
                                        <div className="col-md-7">
                                            <div className="row">
                                                <h3>Name: {program.programName}</h3>
                                            </div>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <div className="row">
                                                        <p><b>Description:</b> {program.programDescription}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-5" style={{ paddingTop: '16px' }}>
                                            <ul className="list-group">
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
                                    {/* Render other program details */}
                                </li>
                            ))}
                        </li>
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
                                <label className="form-label">{t('programDescription')}</label>
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
                                <label className="form-label">{t('programSkillsDeveloped')}</label>
                                <div>{renderSkillOptions()}</div>
                                <div style={{ paddingTop: '10px' }}>
                                    Selected Skills:
                                </div>
                                <ul className="list-group">
                                    {selectedSkills.map((skill, index) => (
                                        <li key={index} className="list-group-item">{skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('ProgramBeginDate')}</label>
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
                                <label className="form-label">{t('ProgramEndDate')}</label>
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
                                <label className="form-label">{t('programNumberOfPlaces')}</label>
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
            </div >
        );
    };

    const renderAddPoints = () => {
        return (
            <div style={{ paddingTop: '15px' }}>
                <div className="text-center">
                    <h1>{t('addPointsToAUserThroughHisEmail')}</h1>
                </div>
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
                        <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>Add points</button>
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
                </div>
                {renderView()}
            </Container>
        </div>
    );
};

export default HomeIntermediary;
