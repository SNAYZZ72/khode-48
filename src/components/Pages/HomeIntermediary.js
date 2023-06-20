import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderIntermediary from '../common/HeaderIntermediary';
// import firebase from 'firebase'; // Import Firebase library or SDK

const HomeIntermediary = () => {
    const { t } = useTranslation();
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState(''); // Add your filter options here

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

    const handleProfileSelection = (profile) => {
        setSelectedProfile(profile);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilter = (event) => {
        setFilterOption(event.target.value);
    };

    // Apply search and filter to profiles
    const filteredProfiles = profiles.filter((profile) => {
        const fullName = profile.fullName.toLowerCase();
        const firstName = profile.firstName.toLowerCase();
        const lastName = profile.lastName.toLowerCase();

        return (
            fullName.includes(searchQuery.toLowerCase()) &&
            (filterOption === '' || profile.filterProperty === filterOption) // Replace 'filterProperty' with your actual property to filter on
        );
    });

    return (
        <div>
            <HeaderIntermediary />
            <div className="container">
                <h2>{t('home.company.title')}</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={t('home.company.searchPlaceholder')}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-control"
                            value={filterOption}
                            onChange={handleFilter}
                        >
                            <option value="">{t('home.company.filterAll')}</option>
                            {/* Add your filter options as <option> elements */}
                        </select>
                    </div>
                </div>
                <div className="row">
                    {filteredProfiles.map((profile) => (
                        <div key={profile.id} className="col-sm-12 col-md-6 col-lg-4">
                            {/* Render profile card */}
                        </div>
                    ))}
                </div>
                {selectedProfile && (
                    <div className="mt-4">
                        {/* Render selected profile details */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeIntermediary;
