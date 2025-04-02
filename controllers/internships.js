import internshipModel from "../models/internships.js";
 const getInternships= async(req,res)=>{
try{
    const {internships}=req.body;
    res.json({success:true,data:internships});
  }
  catch (error){
    res.json({success:false,message:error});
  }
 }
 export {getInternships};