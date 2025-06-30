const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const generatePlanRoute = require('./routes/generatePlan');
const itineraryRoutes = require('./routes/itineraryRoutes');
//const PlanRoutes = require('./routes/PlanRoutes');
//app.use('/api/plans', planRoutes);


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/generate-plan', generatePlanRoute);
app.use('/api/itineraries', itineraryRoutes);
//const planRoutes = require('./routes/planRoutes');
//app.use('/api/Plans', PlanRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
