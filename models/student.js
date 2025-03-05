import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    stdUserId: { type:mongoose.Schema.Types.ObjectId, ref:'studentUser', required:true },//references studentUser schema defined in user_std
    stdImg: { type: String},
    stdName: { type: String, required: true },
    age: { type: Number },
    address: { type: Object },
    phno: {type: Number}
})

const studentModel =mongoose.models.student || mongoose.model('student',studentSchema)
export default studentModel;