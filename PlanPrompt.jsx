import React, { useState } from 'react';
import axios from 'axios';
import './PlanPrompt.css';

const PlanPrompt = () => {
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/generate-plan`, { prompt });
      setPlan(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      //const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/itineraries/save`, { ...plan, originalPrompt: prompt });
      const res = await fetch('http://localhost:5000/api/itineraries', {...plan, originalPrompt: prompt });

      setMessage('✅ Plan saved successfully!');
    } catch (err) {
      setMessage('❌ Failed to save plan.');
    }
  };

  return (
    <div className="plan-container">
      <h1>🧳 Plan Your Trip</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., I am going to Delhi from Hyderabad with my family..."
          required
        />
        <button type="submit">Generate Plan</button>
      </form>

      {plan && (
        <div className="plan-result">
          <h2>📅 {plan.days} Day Trip</h2>
          <h3>📍 Places to Visit:</h3>
          <ul>
            {plan.places.map((place, idx) => <li key={idx}>{place}</li>)}
          </ul>
          <p>🏨 Stay: {plan.accommodation}</p>
          <p>💸 Budget: {plan.budget}</p>
          <p>💡 Tip: {plan.tip}</p>
          <button onClick={handleSave}>💾 Save this Plan</button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PlanPrompt;