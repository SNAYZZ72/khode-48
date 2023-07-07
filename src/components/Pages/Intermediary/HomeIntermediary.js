import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../../common/Header/HeaderIntermediary';
import { auth, firestore } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';

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
    const [selectedView, setSelectedView] = useState('');
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
                            console.log('User UID:', uid);
                            console.log('email:', mapping.email);

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

                            return;
                        }
                    }
                }

                // User not found
                console.log('User not found.');
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
            //reload the page
            alert('Points added successfully.');
            window.location.reload();
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

            // Create a new program inFirebase
            const sentProgram = {
                programName: createProgram.programName,
                programDescription: createProgram.programDescription,
                skillsDeveloped: selectedSkills, // Update with selected skills
                startDate: createProgram.startDate,
                endDate: createProgram.endDate,
                numberOfPlaces: createProgram.numberOfPlaces,
            };

            const userId = auth.currentUser.uid;
            const parentDocRef = firestore.collection('programs').doc(userId);
            const programId = parentDocRef.id;

            // Add a new program to the programs collection
            await parentDocRef.set({ [mapName]: sentProgram }, { merge: true });

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
        }
    };


    const renderProgramView = () => {
        return (
            <div>
                <button onClick={handleShowModal}><h5>{t('CreateNewProgram')}</h5></button>
                {userPrograms.length > 0 ? (
                            <ul>
                                {userPrograms.map((program) => (
                                    <li key={program.programId}>
                                        <p>{t('programName')}: {program.programName}</p>
                                        <p>{t('programDescription')}: {program.programDescription}</p>
                                        <p>{t('startData')}: {program.startDate}</p>
                                        <p>{t('endDate')}: {program.endDate}</p>
                                        <p>{t('numberOfPlace')}: {program.numberOfPlaces}</p>
                                        <p>{t('skillsDeveloped')}: {program.skillsDeveloped.join(', ')}</p>
                                        {/* Render other program details */}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No programs found.</p>
                        )}



                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('CreateNewProgram')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
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
                                <div className="selected-skills">
                                    Selected Skills: {selectedSkills.join(', ')}
                                </div>
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
                            <button type="submit" className="btn btn-primary">
                                {t('programCreate')}
                            </button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('close')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };

    const renderAddPoints = () => {
        return (
            <div>
                <h2>{t('addPointsToAUserThroughHisEmail')}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{t('email')}:</label>
                        <input
                            type="email"
                            id="emailInput"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>{t('proactivity')}:</label>
                        <input
                            type="text"
                            id="proactivityInput"
                            value={proactivity}
                            onChange={(e) => setProactivity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>{t('creativity')}:</label>
                        <input
                            type="text"
                            id="creativityInput"
                            value={creativity}
                            onChange={(e) => setCreativity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>{t('initiative')}:</label>
                        <input
                            type="text"
                            id="initiativeInput"
                            value={initiative}
                            onChange={(e) => setInitiative(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>{t('empathy')}:</label>
                        <input
                            type="text"
                            id="empathyInput"
                            value={empathy}
                            onChange={(e) => setEmpathy(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>{t('leadership')}:</label>
                        <input
                            type="text"
                            id="leadershipInput"
                            value={leadership}
                            onChange={(e) => setLeadership(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>{t('teamwork')}:</label>
                        <input
                            type="text"
                            id="teamworkInput"
                            value={teamwork}
                            onChange={(e) => setTeamwork(e.target.value)}
                        />
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    };

    return (
        <div>
            <HeaderIntermediary />
            <div className="view-selector">
                <button onClick={() => handleViewSelect('programView')}>
                    {t('programView')}
                </button>
                <button onClick={() => handleViewSelect('addPoints')}>
                    {t('addPoints')}
                </button>
            </div>
            {renderView()}
        </div>
    );
};

export default HomeIntermediary;
