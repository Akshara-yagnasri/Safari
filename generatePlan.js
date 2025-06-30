

const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

/**
 * Function to generate travel plan based on prompt
 * @param {string} prompt - User input prompt
 * @returns {Object} itinerary object
 */
function generateTravelPlan(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  // Delhi (family trip)
  if (lowerPrompt.includes('delhi') && lowerPrompt.includes('family')) {
    return {
      days: 4,
      places: ['Red Fort', 'India Gate', 'Lotus Temple', 'Akshardham Temple'],
      accommodation: 'Family suite in a 3-star hotel near Connaught Place',
      budget: '₹15,000 - ₹20,000',
      tip: 'Use Delhi Metro for fast travel with family. Visit India Gate during sunset.'
    };
  }

  // Mumbai
  if (lowerPrompt.includes('mumbai')) {
    return {
      days: 3,
      places: ['Marine Drive', 'Gateway of India', 'Juhu Beach', 'Siddhivinayak Temple'],
      accommodation: 'Sea-facing hotel in South Mumbai',
      budget: '₹18,000 - ₹25,000',
      tip: 'Take local trains during off-peak hours. Explore Colaba street shopping.'
    };
  }

  // Hyderabad
  if (lowerPrompt.includes('hyderabad')) {
    return {
      days: 2,
      places: ['Charminar', 'Golconda Fort', 'Hussain Sagar Lake', 'Salar Jung Museum'],
      accommodation: 'Budget hotel near Banjara Hills',
      budget: '₹8,000 - ₹12,000',
      tip: 'Try Hyderabadi biryani at Paradise or Bawarchi. Avoid peak hour traffic.'
    };
  }

  // Goa
  if (lowerPrompt.includes('goa')) {
    return {
      days: 5,
      places: ['Calangute Beach', 'Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'],
      accommodation: 'Beachside resort in North Goa',
      budget: '₹20,000 - ₹30,000',
      tip: 'Rent a scooter for local travel. Avoid monsoon season for beach activities.'
    };
  }

  // Shimla
  if (lowerPrompt.includes('shimla')) {
    return {
      days: 3,
      places: ['Mall Road', 'Jakhoo Temple', 'Kufri', 'Christ Church'],
      accommodation: 'Hillside cottage with valley view',
      budget: '₹10,000 - ₹15,000',
      tip: 'Carry warm clothes even in summer. Avoid weekends for a peaceful experience.'
    };
  }

  // Manali
  if (lowerPrompt.includes('manali')) {
    return {
      days: 4,
      places: ['Solang Valley', 'Rohtang Pass', 'Hidimba Devi Temple', 'Old Manali'],
      accommodation: 'Riverside guesthouse in Old Manali',
      budget: '₹12,000 - ₹18,000',
      tip: 'Book Rohtang permits in advance. Try local Himachali cuisine.'
    };
  }

  // Jaipur
  if (lowerPrompt.includes('jaipur')) {
    return {
      days: 3,
      places: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
      accommodation: 'Heritage hotel near Pink City',
      budget: '₹10,000 - ₹15,000',
      tip: 'Best time to visit is winter. Hire a guide to enjoy history.'
    };
  }

  // Default fallback plan
  return {
    days: 2,
    places: ['Popular Landmark A', 'Popular Landmark B'],
    accommodation: 'Standard guesthouse or Airbnb',
    budget: '₹5,000 - ₹10,000',
    tip: 'Please enter more details like city and trip type for better suggestions.'
  };
}

// ✅ API route to generate and save travel plan
router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required and must be a string' });
  }

  try {
    // Step 1: Generate plan
    const planData = generateTravelPlan(prompt);

    // Step 2: Create and save in DB
    const newItinerary = new Itinerary({
      originalPrompt: prompt,
      ...planData
    });

    await newItinerary.save();

    // Step 3: Return saved plan
    return res.status(200).json(newItinerary);
  } catch (error) {
    console.error('❌ Error generating plan:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

