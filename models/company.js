import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    cmpUserId: { type: String, required: true },
    cmpName: { type: String, required: true },
    cmpImg: { type: String},
    address: { type: Object},
    phno: {type: Number }
})
//has been changed
const companyModel = mongoose.models.company || mongoose.model('company',companySchema)
export default companyModel;