import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { auth } from '../../firebase';
import { firestore } from '../../firebase';
import { use } from 'i18next';

//let authStateChangedExecuted = false;



const ProfileYouth = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [youthImage, setYouthImage] = useState(null);
    const [data, setData] = useState({});
    const [file, setFile] = useState("");

    const [youthFormErrors, setYouthFormErrors] = useState({
        age: false,
        city: false,
        information: false,
        education: false,
        language: false
    });

    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const [selectedYouthImage, setSelectedYouthImage] = useState(null);

    const [youthFormData, setYouthFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        city: '',
        education: '',
        information: '',
        proactivity: 10,
        creativity: 52,
        initiative: 37,
        empathy: 49,
        leadership: 16,
        teamwork: 78,
        points: 242
    });

    const authStateChangedExecuted = useRef(false);



    //get data from firestore according to the person logged in
    useEffect(() => {
        const handleAuthStateChanged = async (user) => {
            if (user) {
                const userId = user.uid;

                try {
                    const userDocRef = firestore.collection('users').doc('usersyouth');
                    const userDoc = await userDocRef.get();

                    if (userDoc.exists) {
                        const userData = userDoc.data()[userId];
                        //setYouthFormData firstname, lastname, city
                        setYouthFormData({
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            city: userData.city,
                            education: userData.educationalLevel,
                            information: userData.information,
                            age: userData.age,
                        });
                        console.log('User data retrieved:', userData.age);
                    } else {
                        console.log('User document not found');
                    }
                } catch (error) {
                    console.log('Error retrieving user data:', error);
                }
            } else {
                console.log('User is not signed in');
            }
        };

        // Attach the event listener only if it hasn't been executed before
        if (!authStateChangedExecuted.current) {
            auth.onAuthStateChanged(handleAuthStateChanged);
            authStateChangedExecuted.current = true;
        }
    }, []);
    

    // Attach the event listener only if it hasn't been executed before
    

    const [languageList, setLanguageList] = useState([
        "English",
        "Spanish",
        "Basque",
    ]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedYouthImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        if (!youthFormData.age || !youthFormData.city || !youthFormData.information || !languageList.length) {
            alert('Veuillez remplir tous les champs obligatoires pour activer votre profil.');
            return;
        }

        setYouthFormErrors({
            age: false,
            city: false,
            information: false,
            education: false,
            language: false,
        });

        try {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;

                const userDocRef = firestore.collection('users').doc('usersyouth');

                await userDocRef.set({
                    firstName: youthFormData.firstName,
                    lastName: youthFormData.lastName,
                    city: youthFormData.city,
                    educationalLevel: youthFormData.education,
                    information: youthFormData.information,
                    dateOfBirth: calculateBirthDate(youthFormData.age),
                    languages: languageList,
                });

                setIsEditing(false);
                alert('Votre profil a été enregistré avec succès !');
            } else {
                console.log('User is not signed in');
            }
        } catch (error) {
            console.log('Error saving user profile:', error);
        }
    };

    const handleCancelProfile = () => {
        setIsEditing(false);
    };

    const handleDeleteLanguage = (language) => {
        const updatedLanguageList = languageList.filter((item) => item !== language);
        setLanguageList(updatedLanguageList);
    };

    const handleAddLanguage = (event) => {
        const newLanguage = event.target.value;
        if (newLanguage && !languageList.includes(newLanguage)) {
            const updatedLanguageList = [...languageList, newLanguage];
            setLanguageList(updatedLanguageList);
            event.target.value = '';
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setYouthFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const calculateBirthDate = (age) => {
        const today = new Date();
        const birthYear = today.getFullYear() - age;
        const birthDate = new Date(birthYear, 0, 1);
        return birthDate;
    };

    const chartData = [
        { name: "Proactivity", value: youthFormData.proactivity, color: "#FF0000" },
        { name: "Creativity", value: youthFormData.creativity, color: "#00FF00" },
        { name: "Initiative", value: youthFormData.initiative, color: "#0000FF" },
        { name: "Empathy", value: youthFormData.empathy, color: "#FFFF00" },
        { name: "Leadership", value: youthFormData.leadership, color: "#00FFFF" },
        { name: "Teamwork", value: youthFormData.teamwork, color: "#FF00FF" },
    ];

    const handleToggle = () => {
        setHideProfile(!hideProfile);
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
        const percentage = (percent * 100).toFixed(1);

        return (
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor="middle"
                dominantBaseline="central"
            >
                {`${chartData[index].name}: ${percentage}%`}
            </text>
        );
    };


    return (
        <div>
            <HeaderYouth />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{youthFormData.firstName} {youthFormData.lastName}</h1>
            </div>

            {isEditing ? (
                <>
                    <div>
                        <label htmlFor="firstName">{t('First Name')}</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={youthFormData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">{t('Last Name')}</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={youthFormData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">{t('Age')}</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={youthFormData.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">{t('City')}</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={youthFormData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="education">{t('Education')}</label>
                        <input
                            type="text"
                            id="education"
                            name="education"
                            value={youthFormData.education}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="information">{t('Information')}</label>
                        <textarea
                            id="information"
                            name="information"
                            value={youthFormData.information}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>{t('Languages')}</label>
                        <ul>
                            {languageList.map((language) => (
                                <li key={language}>
                                    {language}
                                    <button onClick={() => handleDeleteLanguage(language)}>
                                        {t('Delete')}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            id="newLanguage"
                            name="newLanguage"
                            placeholder={t('Add Language')}
                            onKeyUp={handleAddLanguage}
                        />
                    </div>
                    <button onClick={handleSaveProfile}>{t('Save')}</button>
                    <button onClick={handleCancelProfile}>{t('Cancel')}</button>
                </>
            ) : (

                <div className="container">
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-2 text-center">
                            <img
                                src={selectedYouthImage || youthImage || '../intermediary-profile-image.png'}
                                alt="Profile picture"
                                style={{ width: '90%', height: 'auto', marginBottom: '15px' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('age')}: {youthFormData.age}
                                    </p>
                                </div>
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('city')}: {youthFormData.city}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <p
                                        style={{
                                            border: "3px solid #F24726",
                                            padding: '5px',
                                            borderRadius: '10px',
                                            height: '140px',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        {youthFormData.information}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col">
                                    <h3>Total points</h3>
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{youthFormData.points}</p>
                                </div>
                                <div className="col">
                                    <h3>{hideProfile ? t('hideProfile') : t('showProfile')}</h3>
                                    {/* switch toggle button to hide profile */}
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                            checked={hideProfile}
                                            onChange={handleToggle}
                                        />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                            {hideProfile ? t('hide') : t('show')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col">
                                    <h3>{t('education')}</h3>
                                    <div className="col">
                                        <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{youthFormData.education}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <h3>{t('language')}</h3>
                                    {languageList.map((language, index) => (
                                        <div className="col" key={index}>
                                            <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{language}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col">
                                    <h3>{t('skills')}</h3>
                                    <div>
                                        <ResponsiveContainer height={300} width="100%">
                                            <PieChart>
                                                <Pie
                                                    dataKey="value"
                                                    isAnimationActive={false}
                                                    data={chartData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    label={renderCustomizedLabel}
                                                >
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={index} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={handleEditProfile}
                            className="btn btn-primary"
                            style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                        >
                            {t('edit')}
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ProfileYouth;
