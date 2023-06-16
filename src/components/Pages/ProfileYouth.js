import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../common/Header';

const ProfileYouth = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        age: 18,
        city: 'Villejeune',
        aboutme: 'Je suis un jeune de 18 ans qui cherche un emploi dans le domaine de la restauration. Je suis motivé et j ai déjà travaillé dans un restaurant. Je suis disponible immédiatement. Je suis prêt à travailler le soir et le week-end. Je suis prêt à travailler dans un rayon de 10 km autour de Villejeune. '
    });

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        // Effectuer la logique de sauvegarde du profil
        setIsEditing(false);
        // Envoyer les données au serveur ou effectuer d'autres actions nécessaires
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <Header />
            <div className="text-center" style={{ paddingBottom: '15px' }}>
                <h1>{formData.firstName} {formData.lastName} Profile</h1>
            </div>

            {isEditing ? (
                <div className="container">
                    <h2>Edit Profile</h2>
                    <form>
                        <div>
                            <label htmlFor="age">Âge :</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Adresse :</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city">Ville :</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="country">Pays :</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleSaveProfile} className="btn btn-primary" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>Register</button>
                    </form>
                </div>
            ) : (
                <div className="container text-center">
                        <div className="row mb-3">
                            <div className="col-md-2">
                                <img src="../intermediary-profile-image.png" alt="Intermediary Profile" style={{ width: '200px', height: '200px' }} />
                            </div>
                            <div className="col-md-5">
                                <div className="row">
                                    <div className="col">
                                        <p style={{ border: "4px solid #F24726", padding: '5px', borderRadius: '10px'}}>Age: {formData.age}</p>
                                    </div>
                                    <div className="col">
                                        <p style={{ border: "4px solid #F24726", padding: '5px', borderRadius: '10px'}}>City: {formData.city}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p style={{ border: "4px solid #F24726", padding: '5px', borderRadius: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                                            {formData.aboutme}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <button onClick={handleEditProfile} className="btn btn-primary" style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}>Edit Profile</button>
                </div>
            )
            }
        </div >
    );
};

export default ProfileYouth;
