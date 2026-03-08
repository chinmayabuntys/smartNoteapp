const Note=require('../models/noteSchema.js');

const createNote = async(req,res)=>{
  const note = await Note.create({
    ...req.body,
    userId:req.userId
  });
  res.json(note);
};

const getNotes = async(req,res)=>{
  const notes = await Note.find({userId:req.userId});
  res.json(notes);
};

const editNote=async(req,res)=>{
  const note=await Note.findById(req.params.id);
  if(!note){
    return res.status(404).json({msg:"Note not found"});
  }
  if(note.userId.toString()!==req.userId){
    return res.status(401).json({msg:"Unauthorized"});
  }
  note.title=req.body.title;
  note.content=req.body.content;
  await note.save();
  res.json(note);
}

const deleteNote = async(req,res)=>{
  await Note.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
};
module.exports={createNote,getNotes,deleteNote,editNote};
