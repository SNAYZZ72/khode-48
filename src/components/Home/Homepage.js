import React, { useState } from 'react';
import { Nav, Navbar, Button, Container, Modal } from 'react-bootstrap';
import Header from '../common/Header';

const Home = () => {
    const [profileType, setProfileType] = useState(''); // Default profile: none
    const [studentCount, setStudentCount] = useState(345); // Number of registered students
    const [companyCount, setCompanyCount] = useState(15); // Number of companies
    const [intermediaryCount, setIntermediaryCount] = useState(200); // Number of intermediaries
    const [showLoginModal, setShowLoginModal] = useState(false); // Login modal visibility

    const handleProfileSelect = (type) => {
        setProfileType(type);
    };

    const handleLogin = () => {
        // Login logic based on the selected profile
        console.log('Logged in as', profileType);
        setShowLoginModal(true); // Show the login modal
    };

    const handleCloseModal = () => {
        setShowLoginModal(false); // Close the login modal
    };

    return (
        <div className="Home">
            <Header />

            {/* Text above the labels */}
            <Container>
                <div className="text-center">
                    <h4>Statistics</h4>
                </div>
            </Container>

            {/* Labels indicating the number of registered students, companies, and intermediaries */}
            <Container>
                <div className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ marginRight: '200px' }}>
                            <h3>{studentCount}</h3>
                            <h3>Young people</h3>
                            <p>lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                        </div>
                        <div style={{ marginRight: '200px' }}>
                            <h3>{companyCount}</h3>
                            <h3>Companies</h3>
                            <p>lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                        </div>
                        <div>
                            <h3>{intermediaryCount}</h3>
                            <h3>Intermediaries</h3>
                            <p>lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                        </div>
                    </div>
                </div>
            </Container>

            <Container>
                <Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link
                                onClick={() => handleProfileSelect('young')}
                                active={profileType === 'young'}
                                style={{ marginRight: '430px', marginLeft: '100px', fontWeight: 'bold', color: 'blue' }}
                            >
                                <img src="../young-profile-image.png" alt="Young Profile" style={{ width: '80px', height: '80px' }} />
                                Young
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleProfileSelect('company')}
                                active={profileType === 'company'}
                                style={{ marginRight: '370px', fontWeight: 'bold', color: 'green' }}
                            >
                                <img src="*/company-profile-image.png" alt="Company Profile" style={{ width: '50px', height: '50px' }} />
                                Company
                            </Nav.Link>
                            <Nav.Link
                                onClick={() => handleProfileSelect('intermediary')}
                                active={profileType === 'intermediary'}
                                style={{ fontWeight: 'bold', color: 'purple' }}
                            >
                                <img src="*/intermediary-profile-image.png" alt="Intermediary Profile" style={{ width: '50px', height: '50px' }} />
                                Intermediary
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>



            {/* Content of the home page based on the selected profile */}
            <Container>
                {/* Specific content for the selected profile */}
                {profileType === 'young' && (
                    <div className="container text-center">
                        <h2>Youth Profile</h2>
                        <p>Welcome to the youth profile page. Here, you can find resources, events, and opportunities for young individuals.</p>
                        <Button variant="primary" onClick={handleLogin}>Log In</Button>
                    </div>
                )}

                {profileType === 'company' && (
                    <div className="container text-center">
                        <h2>Company Profile</h2>
                        <p>Welcome to the company profile page. Explore our network of young people, ... .</p>
                        <Button variant="primary" onClick={handleLogin}>Log In</Button>
                    </div>
                )}

                {profileType === 'intermediary' && (
                    <div className="container text-center">
                        <h2>Intermediary Profile</h2>
                        <p>Welcome to the intermediary profile page. Connect with other professionals, access tools, and contribute to the community.</p>
                        <Button variant="primary" onClick={handleLogin}>Log In</Button>
                    </div>
                )}
            </Container>

            {/* Login Modal */}
            <Modal show={showLoginModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add your login form or content here */}
                    {/* Example login form */}
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" />
                        </div>
                        <Button variant="primary" type="submit">Submit</Button>
                    </form>
                    {profileType === 'young' && (
                        <p>Don't have a young account? <a href="/signup/young">Create Young Account</a></p>
                    )}
                    {profileType === 'company' && (
                        <p>Don't have a company account? <a href="/signup/company">Create Company Account</a></p>
                    )}
                    {profileType === 'intermediary' && (
                        <p>Don't have an intermediary account? <a href="/signup/intermediary">Create Intermediary Account</a></p>
                    )}
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Home;
