import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HeaderYouth from '../../common/Header/HeaderYouth';
import { Modal, Button } from 'react-bootstrap';

const HomeYouth = () => {
    const { t } = useTranslation();

    const projectsData = [
        {
            id: 1,
            title: 'Project 1',
            description: 'Description of Project 1',
            company: 'Company A',
        },
        {
            id: 2,
            title: 'Project 2',
            description: 'Description of Project 2',
            company: 'Company B',
        },
        {
            id: 3,
            title: 'Project 3',
            description: 'Description of Project 3',
            company: 'Company C',
        },
        // Add more projects as needed
    ];

    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(() => {
        // Simulating API call to fetch projects data
        setTimeout(() => {
            setProjects(projectsData);
        }, 1000);
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterQuery(event.target.value);
    };

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterQuery === '' || project.company === filterQuery)
    );

    const handleSeeMore = (project) => {
        // Implement your logic here to handle "See More" button click
        console.log('See More clicked:', project);
    };

    return (
        <>
            <HeaderYouth />
            <div className="container">
                <h2>{t('Projects')}</h2>

                <div className="row mb-3">
                    <div className="col-md-9">
                        <div className="input-group">
                            <span className="input-group-text">{t('Search')}:</span>
                            <input
                                type="text"
                                className="form-control"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text">{t('Filter')}:</span>
                            <select
                                className="form-select"
                                value={filterQuery}
                                onChange={handleFilterChange}
                            >
                                <option value="">{t('All')}</option>
                                <option value="Company A">Company A</option>
                                <option value="Company B">Company B</option>
                                <option value="Company C">Company C</option>
                            </select>
                        </div>
                    </div>
                </div>

                {filteredProjects.length === 0 ? (
                    <p>{t('No projects found.')}</p>
                ) : (
                    <ul className="list-group">
                        {filteredProjects.map((project) => (
                            <li key={project.id} className="list-group-item">
                                <h3>{project.title}</h3>
                                <p>{t('Description')}: {project.description}</p>
                                <p>{t('Company')}: {project.company}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleSeeMore(project)}
                                    style={{ backgroundColor: '#F24726', borderColor: '#F24726' }}
                                >
                                    {t('See More')}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default HomeYouth;
