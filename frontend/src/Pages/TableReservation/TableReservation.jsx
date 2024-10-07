
import React, { useState } from 'react';
import './TableReservation.css'

const TableReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sending reservation data to the backend
    try {
      const response = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        alert('Table reserved successfully!');
      } else {
        alert('Failed to reserve the table.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while reserving the table.');
    }
  };

  return (
    <div className="reservation-form">
      <h2 className='h2'>Table Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="number" name="guests" placeholder="Number of Guests" value={formData.guests} onChange={handleChange} required />
        <button type="submit">Reserve Table</button>
      </form>
    </div>
  );
};

export default TableReservation;
