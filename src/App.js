import './App.css';
import AboutUS from './component/AboutUS';
import Navbar from './component/Navbar';
import Home from './component/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUS />} />
          
          </Route>
          
        </Routes>
      </Router>
  );
}

export default App;
