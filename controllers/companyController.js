import validator from "validator";
import cmpDetailsModel from "../models/company_details.js";


const addEmployee=async (req,res)=>{
    try{
        const {stdId,id,teamName}=req.body;//assuming it's from req.body
        console.log(id, teamName);
        const updatedInternsDetails = await cmpDetailsModel.findOneAndUpdate(
            {cmpUserId:id},//id of company record
            { $push: { interns: stdId } },
            { new: true, useFindAndModify: false },
        );
        const updatedTeamDetails = await cmpDetailsModel.findOneAndUpdate(
            {cmpUserId:id ,"teams.teamName":teamName},//conditon to check for teamName and id of company record, $ indicates position of rec matched accordinfg to query
            {$push: {"teams.$.interns":stdId}},
            { new: true, useFindAndModify: false },
        );
        if (!updatedTeamDetails) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }
        else{
            res.json({success:true,data:{updatedInternsDetails,updatedTeamDetails}})
        }
        
        

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
            interns:interns,//array of std Ids
            desc:desc
        }
        const createdTeams= await cmpDetailsModel.findOneAndUpdate(
            {cmpUserId:id},
            {$push: {teams:team}},
            { new: true, useFindAndModify: false }
        )
    const teamCreated = await createdTeams.save();
    if (teamCreated){
        res.json({success:true,data:{teamCreated}})
    }
    else{
        res.json({success:false,message:"Team not created"})
    }
        
}
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}
const getTeam=async (req,res)=>{
    try{
        const {id,teamName}=req.body;//assuming it's from req.body
        const teamsDetails = await cmpDetailsModel.findOne({cmpUserId:id, "teams.teamName":teamName}, {"teams.$":1});//projection to return only matched item
        console.log(teamsDetails)
        if (!teamsDetails) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }
        res.json({success:true,data:{teamsDetails}})
        
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}

const getEmployees=async (req,res)=>{
    try{
        const {id}=req.body;//assuming it's from req.body
        const teamsObj= await cmpDetailsModel.findOne({cmpUserId:id},{teams:1, _id:0});
        const teams=teamsObj.teams;
        let empData=[];
        teams.forEach((team)=>{
            let teamAndMembers={
                teamName:team.teamName,
                interns:team.interns
            }
            empData.push(teamAndMembers);
        })
        console.log(empData)
        res.json({success:true,data:{empData}})
        
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
    
}

export { addEmployee, createTeam, getTeam, getEmployees }