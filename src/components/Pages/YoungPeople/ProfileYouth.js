import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';

const ProfileYouth = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [image, setImage] = useState(null);

    //test
    const [formErrors, setFormErrors] = useState({
        age: false,
        city: false,
        aboutme: false,
        education: false,
        language: false
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        age: 18,
        city: 'Villejeune',
        aboutme: 'Je suis un jeune de 18 ans qui cherche un emploi dans le domaine de la restauration. Je suis motivé et j\'ai déjà travaillé dans un restaurant. Je suis disponible immédiatement. Je suis prêt à travailler le soir et le week-end. Je suis prêt à travailler dans un rayon de 10 km autour de Villejeune. J\'ai un permis de conduire et une voiture.',
        proactivity: 10,
        creativity: 52,
        initiative: 37,
        empathy: 49,
        leadership: 16,
        teamwork: 78,
        points: 242
    });

    const [educationList, setEducationList] = useState([
        "Basic Education",
        "Engineering"
    ]);

    const [languageList, setLanguageList] = useState([
        "English",
        "Spanish",
        "Basque"
    ]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        // Vérifier si les champs requis sont remplis
        if (!formData.age || !formData.city || !formData.aboutme || !educationList.length || !languageList.length) {
            alert('Please fill in all the required fields to enable your profile.');
            return;
        }

        // Réinitialiser les erreurs de formulaire
        setFormErrors({
            age: false,
            city: false,
            aboutme: false,
            education: false,
            language: false
        });

        // Effectuer la logique de sauvegarde du profil
        setIsEditing(false);

        // Mettre à jour l'image avec la nouvelle image sélectionnée
        setImage(selectedImage);

        // Réinitialiser l'état de l'image sélectionnée
        setSelectedImage(null);

        // Envoyer les données au serveur ou effectuer d'autres actions nécessaires
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('educationList', JSON.stringify(educationList));
        localStorage.setItem('languageList', JSON.stringify(languageList));
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleEducationChange = (index, value) => {
        setEducationList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleLanguageChange = (index, value) => {
        setLanguageList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleAddEducation = () => {
        const newEducationList = [...educationList, ''];
        setEducationList(newEducationList);
        localStorage.setItem('educationList', JSON.stringify(newEducationList));
    };

    const handleRemoveEducation = (index) => {
        const newEducationList = educationList.filter((_, i) => i !== index);
        setEducationList(newEducationList);
        localStorage.setItem('educationList', JSON.stringify(newEducationList));
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

    const chartData = [
        { name: 'Proactivity', value: formData.proactivity, color: '#FF0000' },
        { name: 'Creativity', value: formData.creativity, color: '#00FF00' },
        { name: 'Initiative', value: formData.initiative, color: '#0000FF' },
        { name: 'Empathy', value: formData.empathy, color: '#FFFF00' },
        { name: 'Leadership', value: formData.leadership, color: '#00FFFF' },
        { name: 'Teamwork', value: formData.teamwork, color: '#FF00FF' }
    ];

    const handleToggle = () => {
        setHideProfile(!hideProfile);
    };



    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }

        const storedEducationList = localStorage.getItem('educationList');
        if (storedEducationList) {
            setEducationList(JSON.parse(storedEducationList));
        }

        const storedLanguageList = localStorage.getItem('languageList');
        if (storedLanguageList) {
            setLanguageList(JSON.parse(storedLanguageList));
        }
    }, []);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
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
                <h1>{formData.firstName} {formData.lastName} {t('profile')}</h1>
            </div>

            {isEditing ? (
                <div className="container">
                    <h2>{t('edit')}</h2>
                    <form>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="age">{t('age')}</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    // Add error class based on formErrors.age
                                    className={formErrors.age ? 'form-control is-invalid' : 'form-control'}
                                />
                                {formErrors.age && (
                                    <div className="invalid-feedback">Age field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="city">{t('city')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                                {formErrors.city && (
                                    <div className="invalid-feedback">City field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="aboutme">About me</label>
                                <textarea
                                    className="form-control"
                                    id="aboutme"
                                    name="aboutme"
                                    value={formData.aboutme}
                                    onChange={handleInputChange}
                                />
                                {formErrors.aboutme && (
                                    <div className="invalid-feedback">About me field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="image">Profile picture</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formErrors.image && (
                                    <div className="invalid-feedback">Image field is required</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <h3>{t('education')}</h3>
                                {educationList.map((education, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={education}
                                            onChange={(e) => handleEducationChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEducation(index)}
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
                                        onClick={handleAddEducation}
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
                                {languageList.map((language, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={language}
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
                                onClick={handleSaveProfile}
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
                        <div className="col-md-2 text-center">
                            <img
                                src={selectedImage || image || '../intermediary-profile-image.png'}
                                alt="Profile pictur"
                                style={{ width: '90%', height: 'auto', marginBottom: '15px' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('age')}: {formData.age}
                                    </p>
                                </div>
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('city')}: {formData.city}
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
                                        {formData.aboutme}
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
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{formData.points}</p>
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
                                    {educationList.map((education, index) => (
                                        <div className="col" key={index}>
                                            <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{education}</p>
                                        </div>
                                    ))}
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