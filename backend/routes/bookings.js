const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { spaceId, bookingDate, duration } = req.body;
  const booking = new Booking({
    userId: req.user.id,
    spaceId,
    bookingDate,
    duration
  });
  await booking.save();
  res.json(booking);
});

router.get('/', authMiddleware, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id })
    .populate('spaceId');
  res.json(bookings);
});

module.exports = router;