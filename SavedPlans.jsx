/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/itineraries/all`)
      .then(res => setPlans(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="plan-container">
      <h1>📚 Saved Plans</h1>
      {plans.map((plan, idx) => (
        <div key={idx} className="plan-result">
          <p><b>Prompt:</b> {plan.originalPrompt}</p>
          <p><b>Days:</b> {plan.days}</p>
          <p><b>Places:</b> {plan.places.join(', ')}</p>
          <p><b>Stay:</b> {plan.accommodation}</p>
          <p><b>Budget:</b> {plan.budget}</p>
          <p><b>Tip:</b> {plan.tip}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SavedPlans;*/




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedPlan, setEditedPlan] = useState({});

  const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${API}/api/itineraries/all`);
      setPlans(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const deletePlan = async (id) => {
    try {
      await axios.delete(`${API}/api/itineraries/${id}`);
      fetchPlans();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const startEdit = (plan) => {
    setEditingId(plan._id);
    setEditedPlan({ ...plan });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedPlan({});
  };

  const updatePlan = async () => {
    try {
      await axios.put(`${API}/api/itineraries/${editingId}`, editedPlan);
      cancelEdit();
      fetchPlans();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="plan-container" style={{ padding: '20px', color: 'white', backgroundColor: '#121212' }}>
      <h1>📚 Saved Plans</h1>
      {plans.length === 0 ? (
        <p>No saved trips found.</p>
      ) : (
        plans.map((plan) => (
          <div key={plan._id} style={{ background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            {editingId === plan._id ? (
              <>
                <p><b>Prompt:</b> <input value={editedPlan.originalPrompt} onChange={e => setEditedPlan({ ...editedPlan, originalPrompt: e.target.value })} /></p>
                <p><b>Days:</b> <input type="number" value={editedPlan.days} onChange={e => setEditedPlan({ ...editedPlan, days: e.target.value })} /></p>
                <p><b>Places:</b> <input value={editedPlan.places.join(', ')} onChange={e => setEditedPlan({ ...editedPlan, places: e.target.value.split(',').map(p => p.trim()) })} /></p>
                <p><b>Stay:</b> <input value={editedPlan.accommodation} onChange={e => setEditedPlan({ ...editedPlan, accommodation: e.target.value })} /></p>
                <p><b>Budget:</b> <input value={editedPlan.budget} onChange={e => setEditedPlan({ ...editedPlan, budget: e.target.value })} /></p>
                <p><b>Tip:</b> <input value={editedPlan.tip} onChange={e => setEditedPlan({ ...editedPlan, tip: e.target.value })} /></p>
                <button onClick={updatePlan} style={{ marginRight: '10px' }}>💾 Save</button>
                <button onClick={cancelEdit}>❌ Cancel</button>
              </>
            ) : (
              <>
                <p><b>Prompt:</b> {plan.originalPrompt}</p>
                <p><b>Days:</b> {plan.days}</p>
                <p><b>Places:</b> {plan.places.join(', ')}</p>
                <p><b>Stay:</b> {plan.accommodation}</p>
                <p><b>Budget:</b> {plan.budget}</p>
                <p><b>Tip:</b> {plan.tip}</p>
                <button onClick={() => startEdit(plan)} style={{ marginRight: '10px' }}>✏️ Edit</button>
                <button onClick={() => deletePlan(plan._id)}>🗑️ Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SavedPlans;

