const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Space' },
  bookingDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // in hours
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);