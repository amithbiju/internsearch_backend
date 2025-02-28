import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    cmpUserId: { type: String, required: true },
    cmpName: { type: String, required:true},
    cmpImg: { type: String, required: true },
    address: { type: Object, required: true },
    phno: {type: Number, required:true}
})
//has been changed
const companyModel = mongoose.models.company || mongoose.model('company',companySchema)
export default companyModel;