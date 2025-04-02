import internshipModel from "./models/internship.js";
 const getInternships= async(req,res)=>{
try{
    const {internships}=req.body;
    res.json({success:true,data:internships});
  }
  catch (error){
    res.json({success:false,message:error});
  }
 }