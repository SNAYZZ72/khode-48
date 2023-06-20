import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Pages
import Home from './components/Home/Homepage';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import FAQ from './components/Pages/FAQ';
import Terms from './components/Pages/Terms';
import Career from './components/Pages/Career';
//import register
import RegisterPageY from "./components/Pages/RegisteredYouth";
import RegisterPageC from "./components/Pages/RegisteredCompanies";
import RegisterPageI from "./components/Pages/RegisteredIntermediaries";
//import Home profile
import HomeYouth from "./components/Pages/HomeYouth";
import HomeCompany from "./components/Pages/HomeCompany";
import HomeIntemediary from "./components/Pages/HomeIntermediary"

//import Profile
import ProfileYouth from "./components/Pages/ProfileYouth";
import ProfileCompany from "./components/Pages/ProfileCompany";
import ProfileIntermediary from "./components/Pages/ProfileIntermediary";

//import Components
import Footer from './components/common/Footer';

//import CookieConsent
import CookieConsent from './components/CookieConsent/CookieConsent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


export default function App() {
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
              <Route path="/registery" element={<RegisterPageY />} />
              <Route path="/registerC" element={<RegisterPageC />} />
              <Route path="/registerI" element={<RegisterPageI />} />
              <Route path="/homeYouth" element={<HomeYouth />} />
              <Route path="/homeCompany" element={<HomeCompany />} />
              <Route path="/homeIntermediary" element={<HomeIntemediary />} />
              <Route path="/profileYouth" element={<ProfileYouth />} />
              <Route path="/profileCompany" element={<ProfileCompany />} />
              <Route path="/profileIntermediary" element={<ProfileIntermediary />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </I18nextProvider>
  );
}
root.render(<App />);
