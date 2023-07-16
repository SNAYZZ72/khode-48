import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { firestore } from '../../firebase';

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

    const handleDeleteIntermediary = async (email) => {
        try {
            const intermediaryDocRef = firestore.collection('users').doc('usersintermediary');
            await intermediaryDocRef.update({
                [email]: firestore.FieldValue.delete()
            });
            console.log('Intermediary deleted');
        } catch (error) {
            console.log('Error deleting intermediary:', error);
        }
    };

    const handleDeleteCompany = async (email) => {
        try {
            const companyDocRef = firestore.collection('users').doc('userscompany');
            await companyDocRef.update({
                [email]: firestore.FieldValue.delete()
            });
            console.log('Company deleted');
        } catch (error) {
            console.log('Error deleting company:', error);
        }
    };

    const handleDeleteYouth = async (email) => {
        try {
            const youthDocRef = firestore.collection('users').doc('usersyouth');
            await youthDocRef.update({
                [email]: firestore.FieldValue.delete()
            });
            console.log('Youth deleted');
        } catch (error) {
            console.log('Error deleting youth:', error);
        }
    };

    const handleDeleteProgram = async (programId) => {
        try {
            const programDocRef = firestore.collection('programs').doc(programId);
            await programDocRef.delete();
            console.log('Program deleted');
        } catch (error) {
            console.log('Error deleting program:', error);
        }
    };

    const handleDeleteJob = async (jobId) => {
        try {
            const jobDocRef = firestore.collection('jobs').doc(jobId);
            await jobDocRef.delete();
            console.log('Job deleted');
        } catch (error) {
            console.log('Error deleting job:', error);
        }
    };

    const handleEditIntermediary = (email) => {
        const intermediary = intermediaries.find((intermediary) => intermediary.email === email);
        setCurrentIntermediary(intermediary);
        setShowIntermediaryModal(true);
    };

    const handleEditCompany = (email) => {
        const company = companies.find((company) => company.email === email);
        setCurrentCompany(company);
        setShowCompanyModal(true);
    };

    const handleEditYouth = (email) => {
        const youth = youths.find((youth) => youth.email === email);
        setCurrentYouth(youth);
        setShowYouthModal(true);
    };

    const handleProfileUpdate = async () => {
        try {
            if (currentIntermediary) {
                const intermediaryDocRef = firestore.collection('users').doc('usersintermediary');
                await intermediaryDocRef.update({
                    [currentIntermediary.email]: {
                        // Update the fields as needed
                        companyName: currentIntermediary.Name
                    }
                });
                console.log('Intermediary updated');
            }

            if (currentCompany) {
                const companyDocRef = firestore.collection('users').doc('userscompany');
                await companyDocRef.update({
                    [currentCompany.email]: {
                        // Update the fields as needed
                        ...currentCompany
                    }
                });
                console.log('Company updated');
            }

            if (currentYouth) {
                const youthDocRef = firestore.collection('users').doc('usersyouth');
                await youthDocRef.update({
                    [currentYouth.email]: {
                        // Update the fields as needed
                        ...currentYouth
                    }
                });
                console.log('Youth updated');
            }
        } catch (error) {
            console.log('Error updating profile:', error);
        }
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

    const renderApprovedApplication = () => {
        return (
            <div>
                {approvedApplications.length > 0 ? (
                    <ul className="list-group">
                        {approvedApplications.map((application) => (
                            <li key={application.userIdentification} className="list-group-item">
                                <div className="row">
                                    <p><b>{t('programName')}:</b> {application.programName}</p>
                                </div>
                                <div className="row">
                                    <p><b>{t('firstName')}:</b> {application.name}</p>
                                </div>
                                <div className="row">
                                    <p><b>{t('email')}:</b> {application.email}</p>
                                </div>
                                {/* Add more information as needed */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('No approved applications.')}</p>
                )}
            </div>
        );
    };
    const renderAppliedRequests = () => {
        return (
            <div>
                {appliedRequests.length > 0 ? (
                    <ul className="list-group">
                        {appliedRequests.map((request) => (
                            <li key={request.requestId} className="list-group-item">
                                <div className="row">
                                    <p><b>{t('programName')}:</b> {request.programName}</p>
                                </div>
                                <div className="row">
                                    <p><b>{t('firstName')}:</b> {request.name}</p>
                                </div>
                                <div className="row">
                                    <p><b>{t('email')}:</b> {request.email}</p>
                                </div>
                                {/* Add more information as needed */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('No applied requests.')}</p>
                )}
            </div>
        );
    };
    useEffect(() => {
        const fetchApprovedApplications = async () => {
            try {
                const approvedRef = firestore.collection('programsApproval');
                const snapshot = await approvedRef.get();
                const approvedList = [];

                snapshot.forEach((doc) => {
                    if (doc.exists) {
                        const approvedData = doc.data();
                        const intermediaryApprovedApplications = Object.values(approvedData);
                        approvedList.push(...intermediaryApprovedApplications);
                    } else {
                        console.log('No such document!');
                    }
                });

                setApprovedApplications(approvedList);
            } catch (error) {
                console.log('Error retrieving approved applications:', error);
            }
        };

        const fetchAppliedRequests = async () => {
            try {
                const requestsRef = firestore.collection('appliedRequests');
                const snapshot = await requestsRef.get();
                const requestsList = [];

                snapshot.forEach((doc) => {
                    if (doc.exists) {
                        const requestData = doc.data();
                        const intermediaryRequests = Object.values(requestData);
                        requestsList.push(...intermediaryRequests);
                    } else {
                        console.log('No such document!');
                    }
                });

                setAppliedRequests(requestsList);
            } catch (error) {
                console.log('Error retrieving applied requests:', error);
            }
        };

        fetchApprovedApplications();
        fetchAppliedRequests();
    }, []);



    return (
        <div className="container">
            <h1 className="mt-4">{t('adminPageTitle')}</h1>

            {/* Intermediaries Table */}
            <h2 className="mt-4">{t('intermediariesTitle')}</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>{t('companyName')}</th>
                        <th>{t('city')}</th>
                        <th>{t('industry')}</th>
                        <th>{t('maturity')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {intermediaries.map((intermediary) => (
                        <tr key={intermediary.email}>
                            <td>{intermediary.companyName}</td>
                            <td>{intermediary.city}</td>
                            <td>{intermediary.industry}</td>
                            <td>{intermediary.maturity}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditIntermediary(intermediary.email)}>
                                    {t('edit')}
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteIntermediary(intermediary.email)}>
                                    {t('delete')}
                                </Button>
                                <Button variant="secondary" onClick={() => console.log('View intermediary')}>
                                    {t('view intermediary')}
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
                        <th>{t('city')}</th>
                        <th>{t('industry')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.email}>
                            <td>{company.companyName}</td>
                            <td>{company.city}</td>
                            <td>{company.industry}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditCompany(company.email)}>
                                    {t('edit')}
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteCompany(company.email)}>
                                    {t('delete')}
                                </Button>
                                <Button variant="secondary" onClick={() => console.log('View Company')}>
                                    {t('viewCompany')}
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
                        <th>{t('city')}</th>
                        <th>{t('age')}</th>
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {youths.map((youth) => (
                        <tr key={youth.email}>
                            <td>{youth.firstName}</td>
                            <td>{youth.lastName}</td>
                            <td>{youth.city}</td>
                            <td>{youth.dateOfBirth}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditYouth(youth.email)}>
                                    {t('edit')}
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteYouth(youth.email)}>
                                    {t('delete')}
                                </Button>
                                <Button variant="secondary" onClick={() => console.log('viewYouth')}>
                                    View Youth Details
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
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map((program) => (
                        <tr key={program.programId}>
                            <td>{program.programName}</td>
                            <td>{program.companyName}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteProgram(program.programId)}>
                                    {t('delete')}
                                </Button>
                                <Button variant="secondary" onClick={() => console.log('View Program')}>
                                    {t('viewProgram')}
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
                        <th>{t('actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.jobId}>
                            <td>{job.jobName}</td>
                            <td>{job.companyName}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteJob(job.jobId)}>
                                    {t('delete')}
                                </Button>
                                <Button variant="secondary" onClick={() => console.log('View Jobs')}>
                                    {t('viewjobs')}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Intermediary Edit Modal */}
            <Modal show={showIntermediaryModal} onHide={handleCloseIntermediaryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Intermediary Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="companyName">
                            <Form.Label column sm={3}>
                                Company Name:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentIntermediary?.companyName || ''}
                                    onChange={(e) =>
                                        setCurrentIntermediary({
                                            ...currentIntermediary,
                                            companyName: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="city">
                            <Form.Label column sm={3}>
                                City:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentIntermediary?.city || ''}
                                    onChange={(e) =>
                                        setCurrentIntermediary({
                                            ...currentIntermediary,
                                            city: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="industry">
                            <Form.Label column sm={3}>
                                Industry:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentIntermediary?.industry || ''}
                                    onChange={(e) =>
                                        setCurrentIntermediary({
                                            ...currentIntermediary,
                                            industry: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="maturity">
                            <Form.Label column sm={3}>
                                Maturity:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentIntermediary?.maturity || ''}
                                    onChange={(e) =>
                                        setCurrentIntermediary({
                                            ...currentIntermediary,
                                            maturity: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        {/* Add more input elements here to edit intermediary information */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseIntermediaryModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProfileUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Company Edit Modal */}
            <Modal show={showCompanyModal} onHide={handleCloseCompanyModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Company Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="companyName">
                            <Form.Label column sm={3}>
                                Company Name:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentCompany?.companyName || ''}
                                    onChange={(e) =>
                                        setCurrentCompany({
                                            ...currentCompany,
                                            companyName: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="city">
                            <Form.Label column sm={3}>
                                City:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentCompany?.city || ''}
                                    onChange={(e) =>
                                        setCurrentCompany({
                                            ...currentCompany,
                                            city: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="industry">
                            <Form.Label column sm={3}>
                                Industry:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentCompany?.industry || ''}
                                    onChange={(e) =>
                                        setCurrentCompany({
                                            ...currentCompany,
                                            industry: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        {/* Add other fields for the company profile */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCompanyModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProfileUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Youth Edit Modal */}
            <Modal show={showYouthModal} onHide={handleCloseYouthModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Youth Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="firstName">
                            <Form.Label column sm={3}>
                                First Name:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentYouth?.firstName || ''}
                                    onChange={(e) =>
                                        setCurrentYouth({
                                            ...currentYouth,
                                            firstName: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="lastName">
                            <Form.Label column sm={3}>
                                Last Name:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentYouth?.lastName || ''}
                                    onChange={(e) =>
                                        setCurrentYouth({
                                            ...currentYouth,
                                            lastName: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="city">
                            <Form.Label column sm={3}>
                                City:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentYouth?.city || ''}
                                    onChange={(e) =>
                                        setCurrentYouth({
                                            ...currentYouth,
                                            city: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="dateOfBirth">
                            <Form.Label column sm={3}>
                                Date of Birth:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    value={currentYouth?.dateOfBirth || ''}
                                    onChange={(e) =>
                                        setCurrentYouth({
                                            ...currentYouth,
                                            dateOfBirth: e.target.value
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>
                        {/* Add more input elements here to edit youth information */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseYouthModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleProfileUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Approved Applications */}
            <h2 className="mt-4">{t('approvedApplicationsTitle')}</h2>
            {renderApprovedApplication()}
            {/* Display Applied Requests */}
            <h2 className="mt-4">{t('appliedRequestsTitle')}</h2>
            {renderAppliedRequests()}
        </div>
    );
};

export default Admin;