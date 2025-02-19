import mongoose from 'mongoose'
const cmpDetailsSchema=new mongoose.Schema({
    cmpUserId:{type:mongoose.Schema.Types.ObjectId,ref:'company',required:true},
    interns:[{type:mongoose.Schema.Types.ObjectId, ref:'studentUser',required:true}],//references studentUser schema defined in user_std
    teams:[{
        teamName:{type:String,required:true},
        interns:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'studentUser', // Each team can have a subset of interns from the outer list
            validate: {
                validator: function(value) {
                    // Ensure that the intern belongs to the outer interns list
                    return this.interns.includes(value);
                },
            }
        }],
        desc:{ type: String, required: true }
    }]
})
const cmpDetailsModel=mongoose.models.companyDetails || mongoose.model('companyDetails',cmpDetailsSchema)
export default cmpDetailsModel;
