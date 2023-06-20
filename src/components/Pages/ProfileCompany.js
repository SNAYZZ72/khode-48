import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderCompany from '../common/HeaderCompany';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const ProfileCompany = () => {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [hideProfile, setHideProfile] = useState(false);
    const [image, setImage] = useState(null);
    const [studentCount, setStudentCount] = useState(5);
    const [challengeCount, setChallengeCount] = useState(7);

    //test
    const [formErrors, setFormErrors] = useState({
        city: false,
        aboutme: false,
        project: false,
        challenge: false
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const [formData, setFormData] = useState({
        companyName: 'Guuk',
        city: 'Villejeune',
        aboutme: 'Je suis un jeune de 18 ans qui cherche un emploi dans le domaine de la restauration. Je suis motivé et j\'ai déjà travaillé dans un restaurant. Je suis disponible immédiatement. Je suis prêt à travailler le soir et le week-end. Je suis prêt à travailler dans un rayon de 10 km autour de Villejeune. J\'ai un permis de conduire et une voiture.',
    });

    const [projectList, setProjectList] = useState([
        "Basic Education",
        "Engineering"
    ]);

    const [challengeList, setChallengeList] = useState([
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
        if (!formData.city || !formData.aboutme || !formData.project || !formData.challenge) {
            setIsEditing(false); // Hide profile if required fields are not filled
            alert('Please fill in all the required fields to enable your profile.');
            return;
        }

        // Réinitialiser les erreurs de formulaire
        setFormErrors({
            city: false,
            aboutme: false,
            project: false,
            challenge: false
        });

        // Effectuer la logique de sauvegarde du profil
        setIsEditing(false);

        // Mettre à jour l'image avec la nouvelle image sélectionnée
        setImage(selectedImage);

        // Réinitialiser l'état de l'image sélectionnée
        setSelectedImage(null);

        // Envoyer les données au serveur ou effectuer d'autres actions nécessaires
        localStorage.setItem('formData', JSON.stringify(formData));
        localStorage.setItem('projectList', JSON.stringify(projectList));
        localStorage.setItem('challengeList', JSON.stringify(challengeList));
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleProjectChange = (index, value) => {
        setProjectList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleChallengeChange = (index, value) => {
        setChallengeList((prevList) => {
            const newList = [...prevList];
            newList[index] = value;
            return newList;
        });
    };

    const handleAddProject = () => {
        const newProjectList = [...projectList, ''];
        setProjectList(newProjectList);
        localStorage.setItem('projectList', JSON.stringify(newProjectList));
    };

    const handleRemoveProject = (index) => {
        const newProjectList = projectList.filter((_, i) => i !== index);
        setProjectList(newProjectList);
        localStorage.setItem('projectList', JSON.stringify(newProjectList));
    };

    const handleAddChallenge = () => {
        const newChallengeList = [...challengeList, ''];
        setChallengeList(newChallengeList);
        localStorage.setItem('challengeList', JSON.stringify(newChallengeList));
    };

    const handleRemoveChallenge = (index) => {
        const newChallengeList = challengeList.filter((_, i) => i !== index);
        setChallengeList(newChallengeList);
        localStorage.setItem('challengeList', JSON.stringify(newChallengeList));
    };

    const handleToggle = () => {
        setHideProfile(!hideProfile);
    };

    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }

        const storedProjectList = localStorage.getItem('projectList');
        if (storedProjectList) {
            setProjectList(JSON.parse(storedProjectList));
        }

        const storedChallengeList = localStorage.getItem('challengeList');
        if (storedChallengeList) {
            setChallengeList(JSON.parse(storedChallengeList));
        }
    }, []);

    return (
        <div>
            <HeaderCompany />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{formData.companyName} {t('profile')}</h1>
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
                                <h3>{t('project')}</h3>
                                {projectList.map((project, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={project}
                                            onChange={(e) => handleProjectChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProject(index)}
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
                                        onClick={handleAddProject}
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
                                <h3>{t('challenge')}</h3>
                                {challengeList.map((challenge, index) => (
                                    <div key={index} className="input-group" style={{ paddingBottom: "10px" }}>
                                        <input
                                            className='form-control'
                                            type="text"
                                            value={challenge}
                                            onChange={(e) => handleChallengeChange(index, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveChallenge(index)}
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
                                        onClick={handleAddChallenge}
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
                                    <h3>{t('socialMedia')}</h3>
                                    <Nav className="align-items-center" style={{ marginTop: "-15px", marginLeft: "-15px" }}>
                                        {/* Contenu de la dernière colonne */}
                                        <Nav.Link href="https://twitter.com" target="_blank" style={{ color: '#F24726', fontSize: '40px' }}>
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.facebook.com" target="_b    lank" style={{ color: '#F24726', fontSize: '40px' }}>
                                            <FontAwesomeIcon icon={faFacebook} />
                                        </Nav.Link>
                                        <Nav.Link href="https://www.instagram.com" target="_blank" style={{ color: '#F24726', fontSize: '40px' }}>
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
                                            style={{ padding: '10px' }}
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
                                    <h3>{t('project')}</h3>
                                    {projectList.map((project, index) => (
                                        <div className="col" key={index}>
                                            <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{project}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="col">
                                    <h3>{t('challenge')}</h3>
                                    {challengeList.map((challenge, index) => (
                                        <div className="col" key={index}>
                                            <p style={{ border: "3px solid #F24726", padding: '5px', borderRadius: '10px' }}>{challenge}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{ paddingBottom: "15px" }}>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col text-center">
                                    <h1 style={{ fontWeight: 'bold' }}>{studentCount}</h1>
                                    <h4>{t('youngPeople')} recruits</h4>
                                </div>
                                <div className="col text-center">
                                    <h1 style={{ fontWeight: 'bold' }}>{challengeCount}</h1>
                                    <h4 style={{ maxWidth: '100%', textAlign: 'center', margin: 'auto' }}>{t('challenge')} accepted</h4>
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

export default ProfileCompany;
