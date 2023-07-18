import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { auth, firestore } from '../../firebase';
import firebase from 'firebase/compat/app';
import HeaderAdmin from '../../common/Header/HeaderAdmin';


const Admin = () => {
    const { t } = useTranslation();
    const [intermediaries, setIntermediaries] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [youths, setYouths] = useState([]);
    const [programs, setUserPrograms] = useState([]);
    const [jobs, setUserJobs] = useState([]);
    const [currentIntermediary, setCurrentIntermediary] = useState(null);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [currentYouth, setCurrentYouth] = useState(null);
    const [showIntermediaryModal, setShowIntermediaryModal] = useState(false);
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showYouthModal, setShowYouthModal] = useState(false);
    const [approvedApplications, setApprovedApplications] = useState([]);
    const [appliedRequests, setAppliedRequests] = useState([]);

    useEffect(() => {
        const fetchIntermediaries = async () => {
            try {
                const intermediaryDocRef = firestore.collection('users').doc('usersintermediary');
                const intermediaryDoc = await intermediaryDocRef.get();

                if (intermediaryDoc.exists) {
                    const intermediaryData = intermediaryDoc.data();
                    const intermediaryList = Object.values(intermediaryData);
                    setIntermediaries(intermediaryList);
                } else {
                    console.log('Intermediary document not found');
                }
            } catch (error) {
                console.log('Error retrieving intermediary data:', error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const companyDocRef = firestore.collection('users').doc('userscompany');
                const companyDoc = await companyDocRef.get();

                if (companyDoc.exists) {
                    const companyData = companyDoc.data();
                    const companyList = Object.values(companyData);
                    setCompanies(companyList);
                } else {
                    console.log('Company document not found');
                }
            } catch (error) {
                console.log('Error retrieving company data:', error);
            }
        };

        const fetchYouths = async () => {
            try {
                const youthDocRef = firestore.collection('users').doc('usersyouth');
                const youthDoc = await youthDocRef.get();

                if (youthDoc.exists) {
                    const youthData = youthDoc.data();
                    const youthList = Object.values(youthData);
                    setYouths(youthList);
                } else {
                    console.log('Youth document not found');
                }
            } catch (error) {
                console.log('Error retrieving youth data:', error);
            }
        };

        const fetchAllPrograms = async () => {
            try {
                const programsRef = firestore.collection('programs');
                const snapshot = await programsRef.get();
                const programs = [];

                snapshot.forEach((doc) => {
                    if (doc.exists) {
                        const programData = doc.data();
                        const intermediaryPrograms = Object.values(programData);
                        programs.push(...intermediaryPrograms);
                    } else {
                        console.log('No such document!');
                    }
                });

                setUserPrograms(programs);
            } catch (error) {
                console.log('Error retrieving program data:', error);
            }
        };

        const fetchAllJobs = async () => {
            try {
                const jobsRef = firestore.collection('jobs');
                const snapshot = await jobsRef.get();
                const jobs = [];

                snapshot.forEach((doc) => {
                    if (doc.exists) {
                        const jobData = doc.data();
                        const companyJobs = Object.values(jobData);
                        jobs.push(...companyJobs);
                    } else {
                        console.log('No such document!');
                    }
                });

                setUserJobs(jobs);
            } catch (error) {
                console.log('Error retrieving job data:', error);
            }
        };

        fetchIntermediaries();
        fetchCompanies();
        fetchYouths();
        fetchAllPrograms();
        fetchAllJobs();
    }, []);

    const handleDeleteYouth = async (Id) => {
        const usersRef = firestore.collection('users').doc('usersyouth');
        const removeField = firebase.firestore.FieldValue.delete();
        await usersRef.update({
            [Id]: removeField,
        });
    };

    const handleDeleteCompany = async (Id) => {
        const usersRef = firestore.collection('users').doc('userscompany');

        const removeField = firebase.firestore.FieldValue.delete();
        await usersRef.update({
            [Id]: removeField,
        });

    };

    const handleDeleteIntermediary = async (Id) => {
        const usersRef = firestore.collection('users').doc('usersintermediary');

        const removeField = firebase.firestore.FieldValue.delete();
        await usersRef.update({
            [Id]: removeField,
        });

    };

    const handleDeleteProgram = async (mapName, Id) => {
        const jobsRef = firestore.collection('programs').doc(Id);
        const removeField = firebase.firestore.FieldValue.delete();
        await jobsRef.update({
            [mapName]: removeField,
        });
    };

    //delete all the job created in the document named "Id"
    const handleDeleteJob = async (mapName, Id) => {
        const jobsRef = firestore.collection('jobs').doc(Id);
        const removeField = firebase.firestore.FieldValue.delete();
        await jobsRef.update({
            [mapName]: removeField,
        });
    };

    const handleCloseIntermediaryModal = () => {
        setShowIntermediaryModal(false);
    };

    const handleCloseCompanyModal = () => {
        setShowCompanyModal(false);
    };

    const handleCloseYouthModal = () => {
        setShowYouthModal(false);
    };

    return (
        <div>
            <HeaderAdmin />
            <div className="container">
                <h1 className="mt-4">{t('adminPageTitle')}</h1>

                {/* Intermediaries Table */}
                <h2 className="mt-4">{t('intermediariesTitle')}</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>{t('companyName')}</th>
                            <th>{t('email')}</th>
                            <th>{t('city')}</th>
                            <th>{t('industry')}</th>
                            <th>{t('maturity')}</th>
                            <th>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {intermediaries.map((intermediary) => (
                            <tr key={intermediary.email}>
                                <td>{intermediary.companyName}</td>
                                <td>{intermediary.email}</td>
                                <td>{intermediary.city}</td>
                                <td>{intermediary.industry}</td>
                                <td>{intermediary.maturity}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteIntermediary(intermediary.Id)}>
                                        {t('delete')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Companies Table */}
                <h2 className="mt-4">{t('companiesTitle')}</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>{t('companyName')}</th>
                            <th>{t('email')}</th>
                            <th>{t('city')}</th>
                            <th>{t('industry')}</th>
                            <th>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.email}>
                                <td>{company.companyName}</td>
                                <td>{company.email}</td>
                                <td>{company.city}</td>
                                <td>{company.industry}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteCompany(company.Id)}>
                                        {t('delete')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Youths Table */}
                <h2 className="mt-4">{t('youthsTitle')}</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>{t('firstName')}</th>
                            <th>{t('lastName')}</th>
                            <th>{t('email')}</th>
                            <th>{t('city')}</th>
                            <th>{t('age')}</th>
                            <th>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {youths.map((youth) => (
                            <tr key={youth.email}>
                                <td>{youth.firstName}</td>
                                <td>{youth.lastName}</td>
                                <td>{youth.email}</td>
                                <td>{youth.city}</td>
                                <td>{youth.dateOfBirth}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteYouth(youth.Id)}>
                                        {t('delete')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Programs Table */}
                <h2 className="mt-4">{t('programsTitle')}</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>{t('programName')}</th>
                            <th>{t('companyName')}</th>
                            <th>{t('email')}</th>
                            <th>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.map((program) => (
                            <tr key={program.programId}>
                                <td>{program.programName}</td>
                                <td>{program.companyName}</td>
                                <td>{program.email}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteProgram(program.mapName, program.Id)}>
                                        {t('delete')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Jobs Table */}
                <h2 className="mt-4">{t('jobsTitle')}</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>{t('jobName')}</th>
                            <th>{t('companyName')}</th>
                            <th>{t('email')}</th>
                            <th>{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.jobId}>
                                <td>{job.jobName}</td>
                                <td>{job.companyName}</td>
                                <td>{job.email}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteJob(job.mapName, job.Id)}>
                                        {t('delete')}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        </div>
    );
};

export default Admin;