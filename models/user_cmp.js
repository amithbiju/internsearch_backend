import mongoose from "mongoose";

const companyUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { minimize: false })

const companyUserModel = mongoose.models.companyUser || mongoose.model('companyUser',companyUserSchema);

export default companyUserModel