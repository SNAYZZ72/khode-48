import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../common/HeaderYouth';
// import firebase from 'firebase'; // Import Firebase library or SDK

const HomeProjects = () => {
    const { t } = useTranslation();
    const [projects, setProjects] = useState([]);
    const [show, setShow] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Fetch data from Firebase and update the projects state
        // const fetchProjects = async () => {
        //     try {
        //         const projectsRef = firebase.database().ref('projects'); // Update with your Firebase database reference
        //         const snapshot = await projectsRef.once('value');
        //         const projectsData = snapshot.val();
        //         const projectsArray = Object.values(projectsData);
        //         setProjects(projectsArray);
        //         setShow(new Array(projectsArray.length).fill(false));
        //     } catch (error) {
        //         console.error('Error fetching projects:', error);
        //     }
        // };

        // fetchProjects();
    }, []);

    const handleToggleShow = (index) => {
        setShow((prevShow) => {
            const updatedShow = [...prevShow];
            updatedShow[index] = !updatedShow[index];
            return updatedShow;
        });
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
    };

    const filteredProjects = projects.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        const filterMatch = filter === 'all' || project.category === filter;
        return titleMatch && filterMatch;
    });

    return (
        <div>
            <HeaderYouth />
            <div className="container">
                <h2>{t('home.projects.title')}</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('home.projects.searchPlaceholder')}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="mb-3">
                    <select className="form-select" value={filter} onChange={handleFilter}>
                        <option value="all">{t('home.projects.filterAll')}</option>
                        <option value="category1">{t('home.projects.filterCategory1')}</option>
                        <option value="category2">{t('home.projects.filterCategory2')}</option>
                        <option value="category3">{t('home.projects.filterCategory3')}</option>
                    </select>
                </div>
                <div className="row">
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{project.title}</h5>
                                    <p className="card-text">{project.description}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleToggleShow(index)}
                                    >
                                        {t('home.projects.button', { index: index + 1 })}
                                    </button>
                                    {show[index] && (
                                        <div className="card-text">{project.additionalText}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeProjects;
