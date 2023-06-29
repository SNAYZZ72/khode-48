import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

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
import HomeIntemediary from "./components/Pages/Intermediary/HomeIntermediary"

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
              <Route path="/homeYouth" element={<RequireAuth><HomeYouth /></RequireAuth>} />
              <Route path="/homeCompany" element={<RequireAuth><HomeCompany /></RequireAuth>} />
              <Route path="/homeIntermediary" element={<RequireAuth><HomeIntemediary /></RequireAuth>} />
              <Route path="/profileYouth" element={<RequireAuth><ProfileYouth /></RequireAuth>} />
              <Route path="/profileCompany" element={<RequireAuth><ProfileCompany /></RequireAuth>} />
              <Route path="/profileIntermediary" element={<RequireAuth><ProfileIntermediary /></RequireAuth>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </I18nextProvider>
  );
}
root.render(<App />);
