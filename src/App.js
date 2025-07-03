import React, { useState } from 'react';
import './App.css';
import logo from './logo.jpeg';

import axios from 'axios';
import Confetti from 'react-confetti';



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
        valley: '',

    is_day: false,
    is_customized: 'no', // Set default to 'no' to ensure a value is always present
    nid_no: '',
    customized_details: '',
    breakfast: '',
    lunch: '',
    barbeque: '', 

    evening_snacks: '',
    dinner: '',
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !formData.date ||
      !formData.name ||
      !formData.person ||
      !formData.phone ||
      !formData.advance
    ) {
      alert('Please fill out the required fields: Date, Name, Person, Phone, and Advance.');
      return;
    }

    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const transformedData = {
      ...formData,
      id: uniqueId,
      eco: formData.eco ? parseInt(formData.eco, 10) : 0,
      person: formData.person ? parseInt(formData.person, 10) : 0,
      advance: formData.advance ? parseInt(formData.advance, 10) : 0,
      due_bill: formData.due_bill ? parseInt(formData.due_bill, 10) : 0,
      tent: formData.tent ? parseInt(formData.tent, 10) : 0,
      regular: formData.regular ? parseInt(formData.regular, 10) : 0,
      glamp: formData.glamp ? parseInt(formData.glamp, 10) : 0,
      sky: formData.sky ? parseInt(formData.sky, 10) : 0,
            valley: formData.valley ? parseInt(formData.valley, 10) : 0,

      breakfast: formData.breakfast ? parseInt(formData.breakfast, 10) : 0,
      lunch: formData.lunch ? parseInt(formData.lunch, 10) : 0,

      evening_snacks: formData.evening_snacks ? parseInt(formData.evening_snacks, 10) : 0,
      dinner: formData.dinner ? parseInt(formData.dinner, 10) : 0,
      barbeque: formData.barbeque ? parseInt(formData.barbeque, 10) : 0, // Ensure it's a number

    };
    console.log('Base URL:', process.env.REACT_APP_BASE_URL);
    console.log('API Key:', process.env.REACT_APP_API_KEY);
    
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
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 60000);
        alert('Booking created successfully!');

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
                    valley: '',

          breakfast: '',
          lunch: '',
          evening_snacks: '',
          dinner: '',
          advance: '',
          due_bill: '',
          person: '',
        });

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 60000);


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
    <div className="App">
   {showConfetti && (
        <div className="confetti-container">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
         
          />
        </div>
      )}

      <div className="form-container">
      {/* {showConfetti && <Confetti      height={window.innerHeight} // Full height of the screen
    // Adds a slight wind effect for a natural drift
   />} */}
        <img src={logo} alt="Logo" className="logo" />
        <h2>Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
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
              <label>Sky pod</label>
              {renderNumberSelect('sky', 1)}
            </div>
               <div className="form-group">
              <label>Valley</label>
              {renderNumberSelect('valley', 5)}
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
              required
            />
          </div>
          {/* <div className="form-group">
  <label>NID No.</label>
  <input
    type="text"
    name="nid_no" // Correctly updated to match the state property
    value={formData.nid_no} // Links to the correct state property
    onChange={handleChange}
    
  /> */}
{/* </div> */}

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
            <label>Last 3 Digits </label>
            <input
              type="text"
              name="last_digits"
              value={formData.last_digits}
              onChange={handleChange}
            />
          </div>

          <h3>Select your food quantity</h3>

          <div className="form-group-row">
            
          <div className="form-group">
            <label>Lunch</label>
            <input
              type="number"
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Snacks</label>
            <input
              type="number"
              name="evening_snacks"
              value={formData.evening_snacks}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Dinner</label>
            <input
              type="number"
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
            />
          </div>
          </div>


        
         
          <div className="form-group-row">

         
        
          <div className="form-group">
        <label>Barbeque</label>
           <input
            type="number"
            name="barbeque" // Corrected state property name
            value={formData.barbeque} // Corrected state binding
          onChange={handleChange}
             />
             </div> 

             
          <div className="form-group">
            <label>Breakfast</label>
            <input
              type="number"
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
            />
          </div>
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
            {/* <div className="form-group">
              <label>Extra Lunch</label>
              <input
                type="checkbox"
                name="is_day"
                checked={formData.is_day}
                onChange={handleChange}
              />
            </div> */}
          </div>

          {formData.is_customized === 'yes' && (
            <div className="form-group">
              <label>Customized Package Details</label>
              <input
                type="text"
                name="customized_details"
                value={formData.customized_details}
                onChange={handleChange}
                placeholder="Enter package details"
              />
            </div>
          )}

       
          <button type="submit" disabled={isButtonDisabled}>
            {isButtonDisabled ? 'Please wait 1 minutes...' : 'Submit'}
          </button>


        </form>
      </div>

     
    </div>
  );
}

export default App;
