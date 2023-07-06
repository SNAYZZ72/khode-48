import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../../common/Header/HeaderIntermediary';
import { auth, firestore } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';


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
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('');

    const [createProgram, setCreateProgram] = useState({
        programName: '',
        programDescription: '',
        skillsDeveloped: [],
        startDate: '',
        endDate: '',
        numberOfPlaces: '',
    });

    useEffect(() => {
        // Fetch data from Firebase and update the profiles state
        // const fetchProfiles = async () => {
        //     try {
        //         const profilesRef = firebase.database().ref('profiles'); // Update with your Firebase database reference
        //         const snapshot = await profilesRef.once('value');
        //         const profilesData = snapshot.val();
        //         const profilesArray = Object.values(profilesData);
        //         setProfiles(profilesArray);
        //     } catch (error) {
        //         console.error('Error fetching profiles:', error);
        //     }
        // };

        // fetchProfiles();
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
            setSelectedSkills((prevSkills) => prevSkills.filter((prevSkill) => prevSkill !== skill));
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

    const handleSubmit = async (event) => {
        event.preventDefault();

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

        // Create a new program in Firebase
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


        //Add a new program to the programs collection
        await parentDocRef.set({ [mapName]: sentProgram }, { merge: true });

    };

    return (
        <div>
            <HeaderIntermediary />
            <div className="container">
                <h2>{t('CreateNewProgram')}</h2>
                {/* Form to create an offer */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('programName')}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="programName"
                            name="programName"
                            value={createProgram.programName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('programDescription')}
                        </label>
                        <textarea
                            className="form-control"
                            id="programDescription"
                            name="programDescription"
                            value={createProgram.programDescription}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('programSkillsDeveloped')}
                        </label>
                        <div>{renderSkillOptions()}</div>
                        <div className="selected-skills">
                            Selected Skills: {selectedSkills.join(', ')}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('ProgramBeginDate')}
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="startDate"
                            name="startDate"
                            value={createProgram.startDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('ProgramEndDate')}
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="endDate"
                            name="endDate"
                            value={createProgram.endDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            {t('programNumberOfPlaces')}
                        </label>
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
            </div>
        </div>);
};

export default HomeIntermediary;