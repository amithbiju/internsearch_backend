import mongoose from 'mongoose';

const internshipSchema=new mongoose.Schema({
            title: {type: String, required:true },
            cmpId: {type: mongoose.Schema.Types.ObjectId, required:true },
            location: {type: Object},
            start_date:{type: Date, required:true},
            duration: {type:Number, required:true},
            stipend: {type:Number},
            deadline: {type:Date, required:true},
            openings: {type: Number, required:true},
            responsibilities:{type:String},
            requirements: {type:String, required:true},
            perks: {type:String},
            company_overview:{type:String, required:true},
            url:{type:String,required:true}
});

const internshipModel= mongoose.models.internships || mongoose.model('internships',internshipSchema);
 export default internshipModel;

