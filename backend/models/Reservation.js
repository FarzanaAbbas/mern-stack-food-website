
import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation;
