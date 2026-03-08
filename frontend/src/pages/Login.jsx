import React from 'react'
import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import {Context} from '../context/Context';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';

function Login() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const {login}=useContext(Context);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/users/login',{email,password});
            login(res.data.token);
            navigate('/notes');
            toast.success(res.data.message);
            setEmail('');
            setPassword('');    
        }catch(error){
            toast.error(error.response?.data?.message||'Login failed');
        }
    }
  return (
    <>
    <div className='login-container'>
        <form onSubmit={handleSubmit} className='login-form-container'>
      <h1>Login</h1>

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

      <button type="submit">Login</button>
      <br />
        <span>Don't have an account? <Link to="/signup">Signup</Link></span>
    </form>
    </div>
    </>
  )
}

export default Login