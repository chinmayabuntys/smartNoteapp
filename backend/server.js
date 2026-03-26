const express = require('express');
const connectDB=require('./db/db.js');
const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 5000;
const noteRoute=require('./routes/noteroute.js');
const userRoute=require('./routes/userroute.js');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/notes', noteRoute);
app.use('/api/users', userRoute);

// Start the server
app.get('/check', (req,res)=>{
  res.send("Server working");
});


app.listen(PORT,'0.0.0.0' ,() => {
  console.log(`Server running on ${PORT}`);
});

