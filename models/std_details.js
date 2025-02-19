import mongoose from 'mongoose'
const stdDetailsSchema=new mongoose.Schema({
    stdUserId:{ type:mongoose.Schema.Types.ObjectId, ref:'studentUser', required:true },
    projects:[String],
    skills:[String],
    gitDetails:{type:mongoose.Schema.Types.Mixed},
    certificates:[String]
})

const stdDetailsModel = mongoose.models.studentDetails || mongoose.model('studentDetails',stdDetailsSchema)
export default stdDetailsModel;