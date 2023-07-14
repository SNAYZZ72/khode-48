import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { auth } from '../../firebase';
import { firestore } from '../../firebase';
import { use } from 'i18next';
import { storage } from '../../firebase';

//let authStateChangedExecuted = false;



const ProfileYouth = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [youthImage, setYouthImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    //test
    const [youthFormErrors, setYouthFormErrors] = useState({
        age: false,
        city: false,
        postalCode: false,
        information: false,
        education: false,
        language: false
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

    const authStateChangedExecuted = useRef(false);



    //get data from firestore according to the person logged in
    useEffect(() => {
        const handleAuthStateChanged = async (user) => {
            if (user) {
                const userId = user.uid;

                try {
                    const storedImage = localStorage.getItem('youthImage');
                    const initialImage = storedImage ? storedImage : '';
                    setYouthImage(initialImage);
                    const userDocRef = firestore.collection('users').doc('usersyouth');
                    const userDoc = await userDocRef.get();

                    if (userDoc.exists) {
                        const userData = userDoc.data()[userId];
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
                        await setImageUrl(userData.imageUrl);
                        await setLanguageList(userData.listLanguages);
                        await setExperienceList(userData.listExperience);
                        console.log('User data retrieved');
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageUrl = e.target.result;
            setYouthImage(imageUrl);
            setImageUrl(imageUrl); // Ajouter cette ligne
        };        

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setYouthImage('');
        }
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    //function to get user uid
    const getUserUid = () => {
        const user = auth.currentUser;
        if (user) {
            return user.uid;
        } else {
            return null;
        }
    };

    const handleSaveProfile = async (user) => {
        setIsEditing(false);
        const userId = getUserUid();
        const storedImage = youthImage;

        try {
            const storageRef = storage.ref();
            const imageRef = storageRef.child(`usersyouth/${getUserUid()}`);
            await imageRef.putString(storedImage, 'data_url');
            const imageUrl = await imageRef.getDownloadURL();
            setYouthImage(imageUrl);

            const userDocRef = firestore.collection('users').doc('usersyouth');
            const userDoc = await userDocRef.get();
            const userData = userDoc.data()[userId];
            await userDocRef.update({
                [userId]: {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    city: youthFormData.city,
                    postalCode: youthFormData.postalCode,
                    educationalLevel: youthFormData.education,
                    information: youthFormData.information,
                    dateOfBirth: userData.dateOfBirth,
                    gender: userData.gender,
                    phoneNumber: userData.phoneNumber,
                    email: userData.email,
                    listLanguages: languageList,
                    listExperience: experienceList,
                    proactivity: userData.proactivity,
                    creativity: userData.creativity,
                    initiative: userData.initiative,
                    empathy: userData.empathy,
                    leadership: userData.leadership,
                    teamwork: userData.teamwork,
                    imageUrl: imageUrl,
                },
            });
            console.log('User data updated');
        } catch (error) {
            console.log('Error updating user data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setYouthFormData((prevYouthFormData) => ({
            ...prevYouthFormData,
            [name]: value,
        }));
    };

    //functions to handle change in language list
    const handleLanguageChange = (index, value) => {
        setLanguageList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleAddLanguage = () => {
        const newLanguageList = [...languageList, ''];
        setLanguageList(newLanguageList);
        localStorage.setItem('languageList', JSON.stringify(newLanguageList));
    };

    const handleRemoveLanguage = (index) => {
        const newLanguageList = languageList.filter((_, i) => i !== index);
        setLanguageList(newLanguageList);
        localStorage.setItem('languageList', JSON.stringify(newLanguageList));
    };

    //functions to handle change in experience list
    const handleExperienceChange = (index, value) => {
        setExperienceList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleAddExperience = () => {
        const newExperienceList = [...experienceList, ''];
        setExperienceList(newExperienceList);
        localStorage.setItem('experienceList', JSON.stringify(newExperienceList));
    };

    const handleRemoveExperience = (index) => {
        const newExperienceList = experienceList.filter((_, i) => i !== index);
        setExperienceList(newExperienceList);
        localStorage.setItem('experienceList', JSON.stringify(newExperienceList));
    };

    const chartData = [
        { name: 'Proactivity', value: youthFormData.proactivity, color: '#FF0000' },
        { name: 'Creativity', value: youthFormData.creativity, color: '#00FF00' },
        { name: 'Initiative', value: youthFormData.initiative, color: '#0000FF' },
        { name: 'Empathy', value: youthFormData.empathy, color: '#FFFF00' },
        { name: 'Leadership', value: youthFormData.leadership, color: '#00FFFF' },
        { name: 'Teamwork', value: youthFormData.teamwork, color: '#FF00FF' }
    ];

    const handleToggle = () => {
        setHideProfile(!hideProfile);
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
        const percentage = (percent * 100).toFixed(1);

        return (
            <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central">
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
                <div className="container">
                    <h2>{t('edit')}</h2>
                    <form onSubmit={handleSaveProfile}>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="city">{t('city')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={youthFormData.city}
                                    onChange={handleInputChange}
                                />
                                {youthFormErrors.city && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="information">{t('aboutme')}</label>
                                <textarea
                                    className="form-control"
                                    id="information"
                                    name="information"
                                    value={youthFormData.information}
                                    onChange={handleInputChange}
                                />
                                {youthFormErrors.information && (
                                    <div className="invalid-feedback">About me field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="image">{t('profilepicture')}</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="youthImage"
                                    name="youthImage"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />

                                {youthFormErrors.image && (
                                    <div className="invalid-feedback">Image field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="education">{t('education')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="education"
                                    name="education"
                                    value={youthFormData.education}
                                    onChange={handleInputChange}
                                />
                                {youthFormErrors.education && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <h3>{t('experience')}</h3>
                                {experienceList.map((experienceList, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={experienceList}
                                            onChange={(e) => handleExperienceChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExperience(index)}
                                            className="btn btn-outline-secondary"
                                            style={{ borderColor: 'rgba(0, 0, 0, 0.125)', backgroundColor: 'rgba(255, 0, 0, 0.5)' }}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                                <div className='text-center'>
                                    <button
                                        type="button"
                                        onClick={handleAddExperience}
                                        className="btn btn-outline-secondary"
                                        style={{ borderColor: 'rgba(0, 0, 0, 0.125)', backgroundColor: 'rgba(0, 255, 0, 0.5)' }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <h3>{t('language')}</h3>
                                {languageList.map((languageList, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={languageList}
                                            onChange={(e) => handleLanguageChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveLanguage(index)}
                                            className="btn btn-outline-secondary"
                                            style={{ borderColor: 'rgba(0, 0, 0, 0.125)', backgroundColor: 'rgba(255, 0, 0, 0.5)' }}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                                <div className='text-center'>
                                    <button
                                        type="button"
                                        onClick={handleAddLanguage}
                                        className="btn btn-outline-secondary"
                                        style={{ borderColor: 'rgba(0, 0, 0, 0.125)', backgroundColor: 'rgba(0, 255, 0, 0.5)' }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                            >
                                {t('registerButton')}
                            </button>
                        </div>
                    </form>
                </div >

            ) : (

                <div className="container">
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-3 text-center">
                            <img
                                src={imageUrl}
                                alt="Profile picture"
                                style={{ width: '15vw', height: 'auto' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-3">
                                    <h4>{t('age')}</h4>
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {youthFormData.age}
                                    </p>
                                </div>
                                <div className="col">
                                    <h4>{t('city')} / {t('postalCode')}</h4>
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {youthFormData.city} / {youthFormData.postalCode}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h4>{t('aboutme')}</h4>
                                    <p
                                        style={{
                                            border: "3px solid #F24726",
                                            padding: '5px',
                                            borderRadius: '10px',
                                            height: '100px',
                                            overflowY: 'auto'
                                        }}
                                    >
                                        {youthFormData.information}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('Contact')}</h4>
                                    <ul className="list-group">
                                        <li className="list-group-item"><b>{t('firstName')}:</b> {youthFormData.firstName} {youthFormData.lastName}</li>
                                        <li className="list-group-item"><b>{t('education')}:</b> {youthFormData.education}</li>
                                        <li className="list-group-item"><b>{t('email')}:</b> {youthFormData.email}</li>
                                        <li className="list-group-item"><b>{t('phoneNumber')}:</b> {youthFormData.phoneNumber}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('language')}</h4>
                                    <ul className="list-group">
                                        {languageList.map((languageList, index) => (
                                            <li className="list-group-item" key={index}>
                                                <div className="col" key={index}>
                                                    <p>{languageList}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col">
                                    <h4>{t('experience')}</h4>
                                    <ul className="list-group">
                                        {experienceList.map((experienceList, index) => (
                                            <li className="list-group-item" key={index}>
                                                <div className="col" key={index}>
                                                    <p>{experienceList}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col">
                                    <h4>{t('skills')}</h4>
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
