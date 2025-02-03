import mongoose from "mongoose";

const studentUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { minimize: false })

const studentUserModel = mongoose.models.studentUser || mongoose.model('studentUser',studentUserSchema);

export default studentUserModel