import mongoose from "mongoose";

const companyUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //cartData: { type: Object, default: {} }
}, { minimize: false })

const companyUserModel =/* mongoose.models.user || */mongoose.model('companyUser',companyUserSchema);

export default companyUserModel