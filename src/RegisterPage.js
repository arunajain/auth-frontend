import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/RegistrationPage.css";

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  address: {
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
  },
  mobileNo: "",
};

function RegistrationPage({ onRegister }) {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  //const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm({ ...form, address: { ...form.address, [key]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && confirmPassword !== form.password) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    const success = await onRegister(form);

    if (success) {
      navigate("/verify");
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
        <div className="form-group_registration">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="cnfpassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            required
          />
          {passwordMatchError && (
            <p className="error-message">{passwordMatchError}</p>
          )}
        </div>
        <div className="form-group_registration">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group_registration">
          <label htmlFor="mobileNo">Mobile No:</label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Address</h3>
        <div className="form-group_registration">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={form.address.street}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={form.address.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="state">Province:</label>
          <input
            type="text"
            id="state"
            name="address.province"
            value={form.address.province}
            onChange={handleChange}
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="zip">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="address.postalCode"
            value={form.address.postalCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group_registration">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="address.country"
            value={form.address.country}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
        <div style={{ marginTop: "10px" }}>
          Already a user? <a href="/">Login here</a>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
