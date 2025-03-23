import validator from "validator";
import stdDetailsModel from "../models/std_details.js";
import cmpDetailsModel from "../models/company_details.js";
import companyModel from "../models/company.js";

const registerCompanyDetails = async (req, res) => {
  try {
    const { id, name, address, phno, img } = req.body;
    // Save cmp Details
    const updatedCmpUserDetails = await companyModel.findOneAndUpdate(
      { cmpUserId: id },
      {
        $set: {
          stdName: name,
          address: address,
          phno: phno,
          cmpImg: img,
        },
      },
      { new: true, useFindAndModify: false }
    );

    // Save to Database
    const cmpUserDetails = await updatedCmpUserDetails.save();

    res.json({ success: true, data: { cmpUserDetails } });
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const editCompanyDetails = async (req, res) => {
  try {
    const { id, name, address, phno, img } = req.body; //assuming it's from req.body

    const updatedCmpUserDetails = await companyModel.findOneAndUpdate(
      { cmpUserId: id },
      {
        $set: {
          stdName: name,
          address: address,
          phno: phno,
          cmpImg: img,
        },
      },
      { new: true, useFindAndModify: false }
    );
    const cmpUserDetails = await updatedCmpUserDetails.save();
    res.json({ success: true, data: { cmpUserDetails } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { stdId, id, teamName } = req.body;
    console.log(id, teamName);

    // Update interns array in company details
    const updatedInternsDetails = await cmpDetailsModel.findOneAndUpdate(
      { cmpUserId: id },
      { $push: { interns: stdId } },
      { new: true, useFindAndModify: false }
    );

    // Update specific team's interns array
    const updatedTeamDetails = await cmpDetailsModel.findOneAndUpdate(
      { cmpUserId: id, "teams.teamName": teamName },
      { $push: { "teams.$.interns": stdId } },
      { new: true, useFindAndModify: false }
    );

    // Update student's isintern status
    const updatedStdDetails = await stdDetailsModel.findOneAndUpdate(
      { stdUserId: stdId },
      { $set: { isintern: true } },
      { new: true }
    );

    // Increment noofinternship (assumes default is 0)
    const updatedStdInternshipDetails = await stdDetailsModel.findOneAndUpdate(
      { stdUserId: stdId },
      { $inc: { noofinternship: 1 } },
      { new: true }
    );

    if (!updatedTeamDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    return res.json({
      success: true,
      data: {
        updatedInternsDetails,
        updatedTeamDetails,
        updatedStdDetails,
        updatedStdInternshipDetails,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const createTeam = async (req, res) => {
  try {
    const { id, teamName, interns, desc } = req.body; //assuming it's from req.body
    //interns is an array of std Ids
    const team = {
      teamName: teamName,
      interns: interns, //array of std Ids
      desc: desc,
    };
    const createdTeams = await cmpDetailsModel.findOneAndUpdate(
      { cmpUserId: id },
      { $push: { teams: team } },
      { new: true, useFindAndModify: false }
    );
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// const createTeam = async (req, res) => {
//   try {
//     const { id, teamName, internsList, desc } = req.body; //assuming it's from req.body
//     //interns is an array of std Ids
//     const team = {
//       teamName: teamName,
//       interns: internsList, //array of std Ids
//       desc: desc,
//     };

//     const createdTeams = await cmpDetailsModel.findOneAndUpdate(
//       { cmpUserId: id },
//       { $push: { interns: { $each: internsList, teams: team } } },
//       { new: true, useFindAndModify: false }
//     );
//     const teamCreated = await createdTeams.save();
//     if (teamCreated) {
//       res.json({ success: true, data: { teamCreated } });
//     } else {
//       res.json({ success: false, message: "Team not created" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const getTeam = async (req, res) => {
  try {
    const { id, teamName } = req.body; //assuming it's from req.body
    const teamsDetails = await cmpDetailsModel.findOne(
      { cmpUserId: id, "teams.teamName": teamName },
      { "teams.$": 1 }
    ); //projection to return only matched item
    console.log(teamsDetails);
    if (!teamsDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }
    res.json({ success: true, data: { teamsDetails } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getTeamNames = async (req, res) => {
  try {
    const { id } = req.body; // Assuming cmpUserId is passed in req.body

    // Find the document and project only the teams array
    const teamsData = await cmpDetailsModel.findOne(
      { cmpUserId: id },
      { "teams.teamName": 1, _id: 0 }
    );

    if (!teamsData || !teamsData.teams || teamsData.teams.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No teams found" });
    }

    // Extracting only the team names
    const teamNames = teamsData.teams.map((team) => team.teamName);

    res.json({ success: true, data: teamNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const { id } = req.body; //assuming it's from req.body
    const teamsObj = await cmpDetailsModel.findOne(
      { cmpUserId: id },
      { teams: 1, _id: 0 }
    );
    const teams = teamsObj.teams;
    let empData = [];
    teams.forEach((team) => {
      let teamAndMembers = {
        teamName: team.teamName,
        interns: team.interns,
      };
      empData.push(teamAndMembers);
    });
    console.log(empData);
    res.json({ success: true, data: { empData } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { stdId, id } = req.body; // Extracting intern ID and company record ID

    // Remove the intern from the general interns array
    const updatedInternsDetails = await cmpDetailsModel.findOneAndUpdate(
      { cmpUserId: id }, // Find the company record
      { $pull: { interns: stdId } }, // Remove intern from main interns array
      { new: true }
    );

    // Remove the intern from their respective team
    const updatedTeamDetails = await cmpDetailsModel.findOneAndUpdate(
      { cmpUserId: id, "teams.interns": stdId }, // Find the team containing this intern
      { $pull: { "teams.$.interns": stdId } }, // Remove intern from the matched team's interns list
      { new: true }
    );

    const updatedStdDetails = await stdDetailsModel.findOneAndUpdate(
      { stdUserId: stdId },
      { $set: { isintern: false } },
      { new: true, useFindAndModify: false }
    );

    // If either update fails (e.g., intern not found)
    if (!updatedInternsDetails || !updatedTeamDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Intern or team not found" });
    }

    // Send response with updated details
    res.json({
      success: true,
      data: { updatedInternsDetails, updatedTeamDetails },
    });

    const stdDetails = await updatedStdDetails.save();
    const internsDetails = await updatedInternsDetails.save();
    const teamsInfo = await updatedTeamDetails.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addEmployee,
  createTeam,
  getTeam,
  getEmployees,
  getTeamNames,
  deleteEmployee,
  registerCompanyDetails,
  editCompanyDetails,
};
