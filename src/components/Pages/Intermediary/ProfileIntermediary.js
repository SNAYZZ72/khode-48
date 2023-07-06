import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../../common/Header/HeaderIntermediary';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { firestore } from '../../firebase';


const ProfileIntermediary = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [intermediaryImage, setIntermediaryImage] = useState(null);

    //test
    const [intermediaryFormErrors, setIntermediaryFormErrors] = useState({
        city: false,
        aboutme: false,
        program: false,
    });

    const [selectedIntermediaryImage, setSelectedIntermediaryImage] = useState(null);

    const [intermediaryFormData, setIntermediaryFormData] = useState({
        intermediaryName: 'Googaz',
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

    const [programList, setProgramList] = useState([
        "Basic Education",
        "Engineering"
    ]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedIntermediaryImage(e.target.result);
        };

        reader.readAsDataURL(file);
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        // Vérifier si les champs requis sont remplis
        if (!intermediaryFormData.city || !intermediaryFormData.aboutme || !programList.length) {
            alert('Please fill in all the required fields to enable your profile.');
            return;
        }

        // Réinitialiser les erreurs de formulaire
        setIntermediaryFormErrors({
            city: false,
            aboutme: false,
            program: false
        });

        // Effectuer la logique de sauvegarde du profil
        setIsEditing(false);

        // Envoyer les données au serveur ou effectuer d'autres actions nécessaires
        localStorage.setItem('intermediaryFormData', JSON.stringify(intermediaryFormData));
        localStorage.setItem('programList', JSON.stringify(programList));
        localStorage.setItem('intermediaryImage', JSON.stringify(selectedIntermediaryImage));
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setIntermediaryFormData((prevIntermediaryFormData) => ({
            ...prevIntermediaryFormData,
            [name]: value,
        }));
    };


    const handleProgramChange = (index, value) => {
        setProgramList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleAddProgram = () => {
        const newProgramList = [...programList, ''];
        setProgramList(newProgramList);
        localStorage.setItem('programList', JSON.stringify(newProgramList));
    };

    const handleRemoveProgram = (index) => {
        const newProgramList = programList.filter((_, i) => i !== index);
        setProgramList(newProgramList);
        localStorage.setItem('programList', JSON.stringify(newProgramList));
    };

    const chartData = [
        { name: 'Proactivity', value: intermediaryFormData.proactivity, color: '#FF0000' },
        { name: 'Creativity', value: intermediaryFormData.creativity, color: '#00FF00' },
        { name: 'Initiative', value: intermediaryFormData.initiative, color: '#0000FF' },
        { name: 'Empathy', value: intermediaryFormData.empathy, color: '#FFFF00' },
        { name: 'Leadership', value: intermediaryFormData.leadership, color: '#00FFFF' },
        { name: 'Teamwork', value: intermediaryFormData.teamwork, color: '#FF00FF' }
    ];

    const handleToggle = () => {
        setHideProfile(!hideProfile);
    };

    useEffect(() => {
        const storedIntermediaryFormData = localStorage.getItem('intermediaryFormData');
        if (storedIntermediaryFormData) {
            setIntermediaryFormData(JSON.parse(storedIntermediaryFormData));
        }

        const storedProgramList = localStorage.getItem('programList');
        if (storedProgramList) {
            setProgramList(JSON.parse(storedProgramList));
        }

        const storedIntermediaryImage = localStorage.getItem('intermediaryImage');
        if (storedIntermediaryImage) {
            setIntermediaryImage(JSON.parse(storedIntermediaryImage));
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
            <HeaderIntermediary />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{intermediaryFormData.intermediaryName} {t('profile')}</h1>
            </div>

            {isEditing ? (
                <div className="container">
                    <h2>{t('edit')}</h2>
                    <form>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="city">{t('city')}</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={intermediaryFormData.city}
                                    onChange={handleInputChange}
                                />
                                {intermediaryFormErrors.city && (
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
                                    value={intermediaryFormData.aboutme}
                                    onChange={handleInputChange}
                                />
                                {intermediaryFormErrors.aboutme && (
                                    <div className="invalid-feedback">About me field is required</div>
                                )}

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label>Profile picture</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="intermediaryImage"
                                    name="intermediaryImage"
                                    accept="intermediaryImage/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <h3>{t('program')}</h3>
                                {programList.map((program, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={program}
                                            onChange={(e) => handleProgramChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProgram(index)}
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
                                        onClick={handleAddProgram}
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
                                src={selectedIntermediaryImage || intermediaryImage || '../intermediary-profile-image.png'}
                                alt="Profile picture"
                                style={{ width: '90%', height: 'auto', marginBottom: '15px' }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col">
                                    <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>
                                        {t('city')}: {intermediaryFormData.city}
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
                                        {intermediaryFormData.aboutme}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col">
                                    <h3>{t('socialMedia')}</h3>
                                    <Nav className="align-items-center" style={{ marginTop: "-15px", marginLeft: "-15px" }}>
                                        {/* Contenu de la dernière colonne */}
                                        <Nav.Link href="https://twitter.com" target="_blank" style={{ color: '#F24726', fontSize: '30px' }}>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.facebook.com" target="_b    lank" style={{ color: '#F24726', fontSize: '30px' }}>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.instagram.com" target="_blank" style={{ color: '#F24726', fontSize: '30px' }}>
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </Nav.Link>
                                    </Nav>
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
                                    <h3>{t('program')}</h3>
                                    {programList.map((program, index) => (
                                        <div className="col" key={index}>
                                            <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{program}</p>
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

export default ProfileIntermediary;
