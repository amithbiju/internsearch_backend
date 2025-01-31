import mongoose from 'mongoose'
const stdDetailsSchema=new mongoose.Schema({
    stdUserId:{ type:mongoose.Schema.Types.ObjectId, ref:'studentUser', required:true },
    projects:[Strings],
    skills:[Strings],
    gitDetails:{type:mongoose.Schema.Types.Mixed},


})