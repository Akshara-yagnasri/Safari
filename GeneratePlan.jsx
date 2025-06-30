import React, { useState } from 'react';

function GeneratePlan() {
  const [prompt, setPrompt] = useState('');
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    try {
      // Step 1: Generate plan from AI
      const res = await fetch('http://localhost:5000/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to generate plan');

      const data = await res.json();
      setPlan(data);
      setError('');

      // ✅ Step 2: Save the generated plan to MongoDB
      const saveRes = await fetch('http://localhost:5000/api/itineraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, originalPrompt: prompt }), // Include the prompt
      });

      if (!saveRes.ok) throw new Error('Failed to save plan');

    } catch (err) {
      setError(err.message);
      setPlan(null);
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>Generate Travel Plan</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. Family trip to Delhi"
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleGenerate} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Generate
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {plan && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Generated Plan</h3>
          <p><strong>Days:</strong> {plan.days}</p>
          <p><strong>Places:</strong> {plan.places.join(', ')}</p>
          <p><strong>Accommodation:</strong> {plan.accommodation}</p>
          <p><strong>Budget:</strong> {plan.budget}</p>
          <p><strong>Tip:</strong> {plan.tip}</p>
        </div>
      )}
    </div>
  );
}

export default GeneratePlan;
