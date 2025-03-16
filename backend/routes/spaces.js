// server/routes/spaces.js
const express = require('express');
const router = express.Router();
const Space = require('../models/Space');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.get('/', async (req, res) => {
  const { location, maxPrice, amenities } = req.query;
  const filters = { availability: true };
  if (location) filters.location = new RegExp(location, 'i');
  if (maxPrice) filters.price = { $lte: Number(maxPrice) };
  if (amenities) filters.amenities = { $all: amenities.split(',') };
  try {
    const spaces = await Space.find(filters);
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching spaces', error: error.message });
  }
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const space = new Space(req.body);
    await space.save();
    res.status(201).json(space);
  } catch (error) {
    res.status(400).json({ message: 'Error creating space', error: error.message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const space = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!space) return res.status(404).json({ message: 'Space not found' });
    res.json(space);
  } catch (error) {
    res.status(400).json({ message: 'Error updating space', error: error.message });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const space = await Space.findByIdAndDelete(req.params.id);
    if (!space) return res.status(404).json({ message: 'Space not found' });
    res.json({ message: 'Space deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting space', error: error.message });
  }
});

module.exports = router;