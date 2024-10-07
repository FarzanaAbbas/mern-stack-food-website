import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  try {
    const { name, phone, date, time, guests } = req.body;
    const newReservation = new Reservation({ name, phone, date, time, guests });
    await newReservation.save();
    res.status(201).json({ success: true, message: 'Table reserved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reserve the table.' });
  }
};
