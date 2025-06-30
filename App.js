import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlanPrompt from './pages/PlanPrompt';
import SavedPlans from './pages/SavedPlans';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/plan" element={<PlanPrompt />} />
        <Route path="/saved" element={<SavedPlans />} />
      </Routes>
    </Router>
  );
}

export default App;
