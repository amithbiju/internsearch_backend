import mongoose from 'mongoose'
const stdDetailsSchema=new mongoose.Schema({
    stdUserId:{ type:mongoose.Schema.Types.ObjectId, ref:'user_std', required:true }
    

})