import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    stdUserId: { type:mongoose.Schema.Types.ObjectId, ref:'student_user', required:true },//references user_std schema
    stdName: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: Object, required: true },
    phno: {type: Number, required:true}
})

const studentModel =/* mongoose.models.order ||*/ mongoose.model('student',studentSchema)
export default studentModel;