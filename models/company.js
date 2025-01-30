import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    cmpUserId: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: Object, required: true },
    phno: {type: Number, required:true}
})

const studentModel = mongoose.models.order || mongoose.model('student',studentSchema)
export default studentModel;