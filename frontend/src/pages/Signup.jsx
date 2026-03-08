import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../style/Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/signup',
        { name, email, password }
      );

      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit} className='signup-form-container'>
      <h1>Signup</h1>

      <input
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button type="submit">Signup</button>
      <br />
      <span>Already have an account? <Link to="/login">Login</Link></span>
    </form>
    </div>
  );
}

export default Signup;