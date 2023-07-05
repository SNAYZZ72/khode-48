import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { firestore } from './components/firebase';

// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Pages
import Home from './components/Home/Homepage';
import About from './components/Pages/Footer/About';
import Contact from './components/Pages/Footer/Contact';
import FAQ from './components/Pages/Footer/FAQ';
import Terms from './components/Pages/Footer/Terms';
import Career from './components/Pages/Footer/Career';
//import register
import RegisterPageY from "./components/Pages/Register/RegisteredYouth";
import RegisterPageC from "./components/Pages/Register/RegisteredCompanies";
import RegisterPageI from "./components/Pages/Register/RegisteredIntermediaries";
//import Home profile
import HomeYouth from "./components/Pages/YoungPeople/HomeYouth";
import HomeCompany from "./components/Pages/Company/HomeCompany";
import HomeIntermediary from "./components/Pages/Intermediary/HomeIntermediary"

//import Profile
import ProfileYouth from "./components/Pages/YoungPeople/ProfileYouth";
import ProfileCompany from "./components/Pages/Company/ProfileCompany";
import ProfileIntermediary from "./components/Pages/Intermediary/ProfileIntermediary";

//import Components
import Footer from './components/common/Footer';

//import CookieConsent
import CookieConsent from './components/CookieConsent/CookieConsent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


export default function App() {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/" />
  }

  console.log(currentUser)

// Vérifie si l'utilisateur est dans le document usersyouth
const isUserInYouthDocument = async (uid) => {
  console.log("Vérification de l'utilisateur dans usersyouth :", uid);
  const userDocRef = firestore.collection('users').doc('usersyouth');
  const userSubcollectionRef = userDocRef.collection(uid);
  const userSubcollection = await userSubcollectionRef.get();
  const userExists = !userSubcollection.empty;
  console.log("Document utilisateur trouvé :", userExists);
  return userExists;
};


// Vérifie si l'utilisateur est dans le document userscompany
const isUserInCompanyDocument = async (uid) => {
  const userDocRef = firestore.collection('users').doc('userscompany').collection(uid);
  const userDocSnapshot = await userDocRef.get();
  return !userDocSnapshot.empty;
};

// Vérifie si l'utilisateur est dans le document usersintermediary
const isUserInIntermediaryDocument = async (uid) => {
  const userDocRef = firestore.collection('users').doc('usersintermediary').collection(uid);
  const userDocSnapshot = await userDocRef.get();
  return !userDocSnapshot.empty;
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
              <Route path="/homeYouth" element={currentUser && isUserInYouthDocument(currentUser.uid) ? <HomeYouth /> : <Home />} />
              <Route path="/homeCompany" element={currentUser && isUserInCompanyDocument(currentUser.uid) ? <HomeCompany /> : <Home />} />
              <Route path="/homeIntermediary" element={currentUser && isUserInIntermediaryDocument(currentUser.uid) ? <HomeIntermediary /> : <Home />} />
              <Route path="/profileYouth" element={currentUser && isUserInYouthDocument(currentUser.uid) ? <ProfileYouth /> : <Home />} />
              <Route path="/profileCompany" element={currentUser && isUserInCompanyDocument(currentUser.uid) ? <ProfileCompany /> : <Home />} />
              <Route path="/profileIntermediary" element={currentUser && isUserInIntermediaryDocument(currentUser.uid) ? <ProfileIntermediary /> : <Home />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </I18nextProvider>
  );
}
root.render(<App />);
