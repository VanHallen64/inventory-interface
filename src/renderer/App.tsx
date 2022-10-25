import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Search from 'components/Search';
import Navbar from '../components/Navbar';
import icon from '../../assets/icon.svg';
import './App.css';

const Home = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>

      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        {/*
          <Route path="/" element={<Components />} />
          <Route path="/" element={<Import />} />
          <Route path="/" element={<Asset />} /> */}
      </Routes>
    </Router>
  );
}
