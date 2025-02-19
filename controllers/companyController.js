import validator from "validator";
import cmpDetailsModel from "../models/company_details.js";


const addEmployee=async (req,res)=>{
    try{
        const {stdId,id,teamName}=req.body;//assuming it's from req.body
        const updatedInternsDetails = await cmpDetailsModel.findByIdAndUpdate(
            id,//id of company record
            { $push: { interns: stdId } },
            { new: true, useFindAndModify: false },
        );
        const updatedTeamDetails = await cmpDetailsModel.findOneAndUpdate(
            {id:id ,"teams.teamName":teamName},//conditon to check for teamName and id of company record, $ indicates position of rec matched accordinfg to query
            {$push: {"teams.$.interns":stdId}},
            { new: true, useFindAndModify: false },
        );
        

    const internsDetails = await updatedInternsDetails.save();
    const teamsInfo = await updatedTeamDetails.save();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}
const createTeam=async (req,res)=>{
    try{
        const {id,teamName,interns,desc}=req.body;//assuming it's from req.body
        //interns is an array of std Ids
        const team={
            teamName:teamName,
            interns:interns,
            desc:desc
        }
        const createdTeams= await cmpDetailsModel.findByIdAndUpdate(
            id,
            {$push: {teams:team}}
        )
    const teamCreated = await createdTeams.save();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}
const getTeam=async (req,res)=>{
    try{
        const {id,teamName}=req.body;//assuming it's from req.body
        const teamsDetails = await cmpDetailsModel.findById(id);
        res.json({success:true,data:{teamsDetails}})
        
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}

const getEmployee=async (req,res)=>{
    try{
        const id=req.body;//assuming it's from req.body
        const teams= await cmpDetailsModel.findById(id).teams;
        empData=[];
        teams.forEach((team)=>{
            teamAndMembers={
                teamName:team.teamName,
                interns:team.interns
            }
            empData.push(teamAndMembers);
        })
        res.json({success:true,data:{empData}})
        
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}

export { addEmployee, createTeam, getTeam, getEmployee }