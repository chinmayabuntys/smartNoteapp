const express = require('express');
const route=express.Router();
const auth=require('../Auth/auth.js');
const {createNote,getNotes,deleteNote,editNote}=require('../controllers/authNote.js');


route.post('/create',auth,createNote);
route.get('/get',auth,getNotes);
route.patch('/edit/:id',auth,editNote);
route.delete('/delete/:id',auth,deleteNote);
module.exports=route;