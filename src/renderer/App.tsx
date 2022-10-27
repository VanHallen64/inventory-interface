import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/Home';
import Search from 'components/Search';
import Navbar from '../components/Navbar';
import icon from '../../assets/icon.svg';
import './App.css';

export default function App() {
  return (
    <div className="main-wrapper main-wrapper-responsive-lg">
      <Router>
        <Navbar />
        <div className="main-container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            {/*
          <Route path="/" element={<Components />} />
          <Route path="/" element={<Import />} />
          <Route path="/" element={<Asset />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}
