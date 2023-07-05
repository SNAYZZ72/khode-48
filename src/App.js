import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthContext } from './context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import { firestore } from './components/firebase';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import des pages
import Home from './components/Home/Homepage';
import About from './components/Pages/Footer/About';
import Contact from './components/Pages/Footer/Contact';
import FAQ from './components/Pages/Footer/FAQ';
import Terms from './components/Pages/Footer/Terms';
import Career from './components/Pages/Footer/Career';
import RegisterPageY from './components/Pages/Register/RegisteredYouth';
import RegisterPageC from './components/Pages/Register/RegisteredCompanies';
import RegisterPageI from './components/Pages/Register/RegisteredIntermediaries';
import HomeYouth from './components/Pages/YoungPeople/HomeYouth';
import HomeCompany from './components/Pages/Company/HomeCompany';
import HomeIntermediary from './components/Pages/Intermediary/HomeIntermediary';
import ProfileYouth from './components/Pages/YoungPeople/ProfileYouth';
import ProfileCompany from './components/Pages/Company/ProfileCompany';
import ProfileIntermediary from './components/Pages/Intermediary/ProfileIntermediary';
import Footer from './components/common/Footer';
import CookieConsent from './components/CookieConsent/CookieConsent';

function App() {

  const { currentUser, role } = useContext(AuthContext); // Ajout de "role" dans la destructuration

  const isUserInYouthDocument = async (uid) => {
    const userRef = firestore.collection('users').doc('usersyouth');
    const userDoc = await userRef.get();
    const userExists = userDoc.data().hasOwnProperty(uid);
    return userExists;
  };

  const isUserInCompanyDocument = async (uid) => {
    const userRef = firestore.collection('users').doc('userscompany');
    const userDoc = await userRef.get();
    const userExists = userDoc.data().hasOwnProperty(uid);
    return userExists;
  };

  const isUserInIntermediaryDocument = async (uid) => {
    const userRef = firestore.collection('users').doc('usersintermediary');
    const userDoc = await userRef.get();
    const userExists = userDoc.data().hasOwnProperty(uid);
    return userExists;
  };

  const RequireAuth = ({ children, role }) => {
    const { currentUser } = useContext(AuthContext);
    const [roleChecked, setRoleChecked] = useState(false);
    const [allowed, setAllowed] = useState(false);

    const checkUserRole = async () => {
      const isYouth = await isUserInYouthDocument(currentUser.uid);
      const isCompany = await isUserInCompanyDocument(currentUser.uid);
      const isIntermediary = await isUserInIntermediaryDocument(currentUser.uid);

      if ((isYouth && role === 'youth') || (isCompany && role === 'company') || (isIntermediary && role === 'intermediary')) {
        setAllowed(true);
      } else {
        console.log("Redirection non autorisée");
      }

      setRoleChecked(true);
    };

    useEffect(() => {
      if (currentUser) {
        checkUserRole();
      } else {
        setRoleChecked(true);
      }
    }, [currentUser]);

    if (!roleChecked) {
      return null;
    }

    if (!allowed) {
      return <Navigate to="/" />;
    }

    return children;
  };


  return (
    <I18nextProvider i18n={i18n}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CookieConsent />
        <Router>
          <div style={{ flex: 1, marginBottom: '10px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/careers" element={<Career />} />
              <Route path="/registerY" element={<RegisterPageY />} />
              <Route path="/registerC" element={<RegisterPageC />} />
              <Route path="/registerI" element={<RegisterPageI />} />
              <Route path="/homeYouth" element={<RequireAuth role="youth"><HomeYouth /></RequireAuth>} />
              <Route path="/homeCompany" element={<RequireAuth role="company"><HomeCompany /></RequireAuth>} />
              <Route path="/homeIntermediary" element={<RequireAuth role="intermediary"><HomeIntermediary /></RequireAuth>} />
              <Route path="/profileYouth" element={<RequireAuth role="youth"><ProfileYouth /></RequireAuth>} />
              <Route path="/profileCompany" element={<RequireAuth role="company"><ProfileCompany /></RequireAuth>} />
              <Route path="/profileIntermediary" element={<RequireAuth role="intermediary"><ProfileIntermediary /></RequireAuth>} />

            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </I18nextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
