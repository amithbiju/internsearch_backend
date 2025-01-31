import mongoose from 'mongoose'
const cmpDetailsSchema=new mongoose.Schema({
    cmpUserId:{type:mongoose.Schema.Types.ObjectId,ref:'company',required:true},
    interns:[{type:mongoose.Schema.Types.ObjectId, ref:'studentUser',required:true}],
    teams:{
        teamName:{type:String,required:true},
        interns:[{type:mongoose.Schema.Types.ObjectId,ref:'companyDetails'}]
    }
})
const cmpDetailsModel=mongoose.model('companyDetails',cmpDetailsSchema)
export default cmpDetailsModel;
