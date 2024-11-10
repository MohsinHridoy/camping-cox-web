import React, { useState } from 'react';
import './App.css';
import logo from './logo.jpeg';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    date: '',
    eco: '',
    name: '',
    person: '',
    phone: '',
    advance: '',
    due_bill: '',        // Changed from dueBill
    last_digits: '',      // Changed from lastDigits
    tent: '',
    regular: '',
    glamp: '',
    sky: '',
    is_day: false,        // Changed from isDay
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are not empty before submitting
    if (!formData.date || !formData.name || !formData.person || !formData.advance) {
      alert('Please fill out the required fields: Date, Name, Person, and Advance.');
      return;
    }

    // Generate a unique ID (using timestamp + random number)
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Prepare the form data, including the generated unique ID
    const transformedData = {
      ...formData,
      id: uniqueId,  // Add the unique ID to the form data
      eco: formData.eco === '' || formData.eco === null ? 0 : parseInt(formData.eco, 10),  // Default to 0 if empty or null
      person: formData.person === '' || formData.person === null ? 0 : parseInt(formData.person, 10),  // Default to 0 if empty or null
      advance: formData.advance === '' || formData.advance === null ? 0 : parseInt(formData.advance, 10),  // Default to 0 if empty or null
      due_bill: formData.due_bill === '' || formData.due_bill === null ? 0 : parseInt(formData.due_bill, 10),  // Default to 0 if empty or null
      tent: formData.tent === '' || formData.tent === null ? 0 : parseInt(formData.tent, 10),  // Default to 0 if empty or null
      regular: formData.regular === '' || formData.regular === null ? 0 : parseInt(formData.regular, 10),  // Default to 0 if empty or null
      glamp: formData.glamp === '' || formData.glamp === null ? 0 : parseInt(formData.glamp, 10),  // Default to 0 if empty or null
      sky: formData.sky === '' || formData.sky === null ? 0 : parseInt(formData.sky, 10),  // Default to 0 if empty or null
    };

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

      console.log('Base URL:', baseUrl);
      console.log('API Key:', apiKey);

      const response = await axios.post(
        `${baseUrl}/bookings`,
        transformedData,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'apikey': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Booking created successfully!');
        alert('Booking created successfully!');
      } else {
        console.error('Failed to create booking:', response.data);
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('Error submitting booking:', error.response?.data || error.message);
      alert(`Error creating booking: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date (YYYY-MM-DD)</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Eco</label>
            <input
              type="number"
              name="eco"
              value={formData.eco}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Person</label>
            <input
              type="number"
              name="person"
              value={formData.person}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Advance</label>
            <input
              type="number"
              name="advance"
              value={formData.advance}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Due Bill</label>
            <input
              type="number"
              name="due_bill"         // Changed from dueBill
              value={formData.due_bill}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last 3 Digits / Payment Method</label>
            <input
              type="text"
              name="last_digits"      // Changed from lastDigits
              value={formData.last_digits}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Tent</label>
            <input
              type="number"
              name="tent"
              value={formData.tent}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Regular</label>
            <input
              type="number"
              name="regular"
              value={formData.regular}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Glamp</label>
            <input
              type="number"
              name="glamp"
              value={formData.glamp}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Sky</label>
            <input
              type="number"
              name="sky"
              value={formData.sky}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Day</label>
            <input
              type="checkbox"
              name="is_day"           // Changed from isDay
              checked={formData.is_day}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
