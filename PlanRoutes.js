const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// CREATE
router.post('/', async (req, res) => {
  const { prompt, suggestion } = req.body;
  const newPlan = new Plan({ prompt, suggestion });
  await newPlan.save();
  res.json(newPlan);
});

// READ
router.get('/', async (req, res) => {
  const plans = await Plan.find().sort({ createdAt: -1 });
  res.json(plans);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPlan);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plan deleted' });
});

module.exports = router;
