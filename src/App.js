import React, { useState } from 'react';
import './App.css';
import logo from './logo.jpeg';
import camp1 from './images/camp1.jpeg'; // Import your camping images
import camp2 from './images/camp2.jpeg';

import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    date: '',
    eco: '',
    name: '',
    person: '',
    phone: '',
    advance: '',
    due_bill: '',
    last_digits: '',
    tent: '',
    regular: '',
    glamp: '',
    sky: '',
    // lakepod: '',
    is_day: false,
    is_customized: '',
    nid_no: '',
    customized_details: '',
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

    if (!formData.date || !formData.name || !formData.person || !formData.advance) {
      alert('Please fill out the required fields: Date, Name, Person, and Advance.');
      return;
    }

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const transformedData = {
      ...formData,
      id: uniqueId,
      eco: formData.eco === '' || formData.eco === null ? 0 : parseInt(formData.eco, 10),
      person: formData.person === '' || formData.person === null ? 0 : parseInt(formData.person, 10),
      advance: formData.advance === '' || formData.advance === null ? 0 : parseInt(formData.advance, 10),
      due_bill: formData.due_bill === '' || formData.due_bill === null ? 0 : parseInt(formData.due_bill, 10),
      tent: formData.tent === '' || formData.tent === null ? 0 : parseInt(formData.tent, 10),
      regular: formData.regular === '' || formData.regular === null ? 0 : parseInt(formData.regular, 10),
      glamp: formData.glamp === '' || formData.glamp === null ? 0 : parseInt(formData.glamp, 10),
      sky: formData.sky === '' || formData.sky === null ? 0 : parseInt(formData.sky, 10),
      // lakepod: formData.lakepod === '' ? 0 : parseInt(formData.lakepod, 10),
    };

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

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
        alert('Booking created successfully!');
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      alert(`Error creating booking: ${error.message}`);
    }
  };

  const renderNumberSelect = (name) => {
    const options = [];
    for (let i = 1; i <= 10; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
      >
        <option value="">Select</option>
        {options}
      </select>
    );
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
          {/* New Row for Eco, Tent, Regular, Glamp, Sky, and Lakepod */}
          <div className="form-group-row">
            <div className="form-group">
              <label>Eco Pod</label>
              {renderNumberSelect('eco')}
            </div>
            <div className="form-group">
              <label>Tent</label>
              {renderNumberSelect('tent')}
            </div>
            <div className="form-group">
              <label>Lake Pod</label>
              {renderNumberSelect('regular')}
            </div>
            <div className="form-group">
              <label>Glamping</label>
              {renderNumberSelect('glamp')}
            </div>
            <div className="form-group">
              <label>Sky pod</label>
              {renderNumberSelect('sky')}
            </div>
         
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

          <div className="form-group-row">
            <div className="form-group">
              <label>Customized Package</label>
              <select
                name="is_customized"
                value={formData.is_customized}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Extra Lunch</label>
              <input
                type="checkbox"
                name="is_day"
                checked={formData.is_day}
                onChange={handleChange}
              />
            </div>
          </div>

          {formData.is_customized === 'yes' && (
            <div className="form-group">
              <label>Customized Package Details</label>
              <input
                type="text"
                name="customized_details"
                value={formData.customized_details}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Nid No. (Optional)</label>
            <input
              type="text"
              name="nid_no"
              value={formData.nid_no}
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
              name="due_bill"
              value={formData.due_bill}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last 3 Digits / Payment Method</label>
            <input
              type="text"
              name="last_digits"
              value={formData.last_digits}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Images Section */}
      <div className="image-gallery">
        <h3>Camp in Cox</h3>
        <div className="gallery">
          <img src={camp1} alt="Camping Spot 1" />
          <img src={camp2} alt="Camping Spot 2" />
          <img src={camp1} alt="Camping Spot 3" />
          <img src={camp2} alt="Camping Spot 4" />
          <img src={camp1} alt="Camping Spot 5" />
          <img src={camp2} alt="Camping Spot 6" />
        </div>
      </div>
    </div>
  );
}

export default App;