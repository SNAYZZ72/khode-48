import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';

//import Pages
import Home from './pages/Home';

//import Components


const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
root.render(<App />);
