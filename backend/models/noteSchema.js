const mongoose = require('mongoose');

const noteSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true})
const Note=mongoose.model('Note',noteSchema);
module.exports=Note;