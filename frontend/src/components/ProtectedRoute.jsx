import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {Context} from '../context/Context.jsx';
const ProtectedRoute = ({ children }) => {
    const {token}=useContext(Context)
    if(!token){
        return <Navigate to="/login"/>
    }
    return children;
}
export default ProtectedRoute;