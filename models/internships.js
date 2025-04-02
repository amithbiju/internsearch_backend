import mongoose from 'mongoose';

const internshipSchema=new mongoose.Schema({
            Domain: {type: String, required:true },
            Title: {type: String, required:true },
            Company:{type: String, required:true },
            Location: {type: String},
            Duration: {type:String, required:true},
            Stipend: {type:String},
            Source_URL:{type:String,required:true},
            Detail_URL:{type:String,required:true},
            Skills:[String],
            embedding:[mongoose.Schema.Types.Decimal128]
});

const internshipModel= mongoose.models.internships || mongoose.model('internships',internshipSchema);
 export default internshipModel;

