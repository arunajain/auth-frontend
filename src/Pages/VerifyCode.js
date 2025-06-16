import React, { useState } from 'react';
import '../css/VerifyCode.css'; 
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(code)
    try {
      const response = await axios.post("http://localhost:3000/api/user/verify-email-code", { code }, { withCredentials: true });
      const data = response.data;
      console.log(data)
      if (data) {
        setMessage('Verification successful! Redirecting to Login.');
        setTimeout(() => {
          navigate('/'); // 👈 Redirect after 2 seconds
        }, 2000);
      } else {
        setMessage(data.message || 'Verification failed.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-container">
        <h2>Verify Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="code">Enter Verification Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyCode;