import React, { useState } from 'react';
import './App.css';
import logo from './logo.jpeg';
import camp1 from './images/camp1.jpeg';
import camp2 from './images/camp2.jpeg';
import axios from 'axios';
import Confetti from 'react-confetti';

function App2() {
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    phone: '',
    nid_no: '',
    is_customized: 'No', // Default to 'No'
    customized_details: '',
    eco: '',
    tent: '',
    regular: '',
    glamp: '',
    sky: '',
    breakfast: '',
    lunch: '',
    evening_snacks: '',
    dinner: '',
    advance: '',
    due_bill: '',
    person: '',
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.date || !formData.name || !formData.phone || !formData.nid_no) {
      alert('Please fill out all required fields: Date, Name, Phone, and NID.');
      return;
    }

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const transformedData = {
      ...formData,
      id: uniqueId,
    };

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

      const response = await axios.post(
        `${baseUrl}/bookings`,
        transformedData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            apikey: apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        alert('Booking created successfully!');

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 30000);

        setFormData({
          date: '',
          name: '',
          phone: '',
          nid_no: '',
          is_customized: 'No',
          customized_details: '',
          eco: '',
          tent: '',
          regular: '',
          glamp: '',
          sky: '',
          breakfast: '',
          lunch: '',
          evening_snacks: '',
          dinner: '',
          advance: '',
          due_bill: '',
          person: '',
        });

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 300000);
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      alert(`Error creating booking: ${error.message}`);
    }
  };

  const renderNumberSelect = (name, limit) => {
    const options = [];
    for (let i = 1; i <= limit; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return (
      <select name={name} value={formData[name]} onChange={handleChange}>
        <option value="">Select</option>
        {options}
      </select>
    );
  };

  return (
    <div className="App2">
      {showConfetti && <Confetti />}
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
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>NID Number</label>
            <input
              type="text"
              name="nid_no"
              value={formData.nid_no}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Is Customized?</label>
            <select
              name="is_customized"
              value={formData.is_customized}
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {formData.is_customized === 'Yes' && (
            <div className="form-group">
              <label>Customized Details</label>
              <textarea
                name="customized_details"
                value={formData.customized_details}
                onChange={handleChange}
                rows="3"
              />
            </div>
          )}
          <div className="form-group-row">
            <div className="form-group">
              <label>Eco Pod</label>
              {renderNumberSelect('eco', 10)}
            </div>
            <div className="form-group">
              <label>Tent</label>
              {renderNumberSelect('tent', 20)}
            </div>
            <div className="form-group">
              <label>Lake Pod</label>
              {renderNumberSelect('regular', 7)}
            </div>
            <div className="form-group">
              <label>Glamping</label>
              {renderNumberSelect('glamp', 10)}
            </div>
            <div className="form-group">
              <label>Sky Pod</label>
              {renderNumberSelect('sky', 1)}
            </div>
          </div>
          <div className="form-group">
            <label>Breakfast</label>
            <input
              type="text"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Lunch</label>
            <input
              type="text"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Evening Snacks</label>
            <input
              type="text"
              name="evening_snacks"
              value={formData.evening_snacks}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Dinner</label>
            <input
              type="text"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Advance Payment</label>
            <input
              type="number"
              name="advance"
              value={formData.advance}
              onChange={handleChange}
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
            <label>Total Persons</label>
            <input
              type="number"
              name="person"
              value={formData.person}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isButtonDisabled}>
            {isButtonDisabled ? 'Please wait 5 minutes...' : 'Submit'}
          </button>
        </form>
      </div>

      <div className="image-gallery">
        <h3>Camp in Cox</h3>
        <div className="gallery">
          <img src={camp1} alt="Camping Spot 1" />
          <img src={camp2} alt="Camping Spot 2" />
        </div>
      </div>
    </div>
  );
}

export default App2;
