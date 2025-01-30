import mongoose from "mongoose";

const studentUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //cartData: { type: Object, default: {} }
}, { minimize: false })

const studentUserModel =/* mongoose.models.user ||*/ mongoose.model('studentUser',studentUserSchema);

export default studentUserModel