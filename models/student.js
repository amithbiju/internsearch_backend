import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    stdUserId: { type:mongoose.Schema.Types.ObjectId, ref:'studentUser', required:true },//references studentUser schema defined in user_std
    stdName: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: Object, required: true },
    phno: {type: Number, required:true}
})

const studentModel =mongoose.models.student || mongoose.model('student',studentSchema)
export default studentModel;