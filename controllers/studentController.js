import validator from "validator";
import studentModel from "../models/student.js";
import stdDetailsModel from "../models/std_details.js";

const registerStudentDetails=async (req,res)=>{
    try{
        const {id,name,age,address,phno,projects,skills,gitDetails,certificates,img}=req.body;//assuming it's from req.body

        const newStdUserDetails=new studentModel({
            stdUserId:id,
            stdName:name,
            age:age,
            address:address,
            phno:phno,
            stdImg:img
        })
    const newStdUserInfo=new stdDetailsModel({
        stdUserId:id,
        projects:projects,
        skills:skills,
        gitDetails:gitDetails,
        certificates:certificates
    })
    const stdUserDetails = await newStdUserDetails.save();
    const stdUserInfo = await newStdUserInfo.save();
    res.json({success:true,data:{stdUserDetails,stdUserInfo}})
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}
const editStudentDetails=async (req,res)=>{
    try{
        const {id,name,age,address,phno,projects,skills,gitDetails,certificates,img}=req.body;//assuming it's from req.body

        const updatedStdUserDetails=await studentModel.findByIdandUpdate({
            stdUserId:id,
            stdName:name,
            age:age,
            address:address,
            phno:phno,
            stdImg:img
        })
    const updatedStdUserInfo=await stdDetailsModel.findByIdandUpdate({
        stdUserId:id,
        projects:projects,
        skills:skills,
        gitDetails:gitDetails,
        certificates:certificates
    })
    const stdUserDetails = await updatedStdUserDetails.save();
    const stdUserInfo = await updatedStdUserInfo.save();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}
const getAllStudentDetails=async (req,res)=>{
    try{
        const id=req.body;
        const stdUserDetails = await studentModel.findById(id);
        const stdUserInfo = await stdDetailsModel.findById(id);
        res.json({success:true,data:{stdUserDetails,stdUserInfo}})
        
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }   
}
export { registerStudentDetails, editStudentDetails, getAllStudentDetails }