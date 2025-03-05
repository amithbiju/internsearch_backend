import validator from "validator";
import studentModel from "../models/student.js";
import stdDetailsModel from "../models/std_details.js";
import axios from "axios";

const registerStudentDetails = async (req, res) => {
  try {
    const {
      id,
      name,
      age,
      address,
      phno,
      projects,
      skills,
      gitDetails, // GitHub username
      certificates,
      noofinternship,
      isintern,
      img,
    } = req.body;

    // Fetch GitHub Repositories
    const githubReposUrl = `https://api.github.com/users/${gitDetails}/repos`;
    const gitResponse = await axios.get(githubReposUrl, {
      headers: {
        Authorization: `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`,
      },
    });
    const repositories = gitResponse.data;

    // Fetch README file for each repository
    const repoDetails = await Promise.all(
      repositories.map(async (repo) => {
        const readmeUrl = `https://api.github.com/repos/${gitDetails}/${repo.name}/contents/README.md`;
        try {
          const readmeResponse = await axios.get(readmeUrl, {
            headers: {
              Authorization: `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`,
            },
          });
          const readmeContent = Buffer.from(
            readmeResponse.data.content,
            "base64"
          ).toString("utf-8");
          return {
            name: repo.name,
            url: repo.html_url,
            language: repo.language,
            description: repo.description,
            readme: readmeContent,
          };
        } catch (error) {
          // If README file is not available, return repo details without README
          return {
            name: repo.name,
            url: repo.html_url,
            readme: "No README available",
          };
        }
      })
    );

    // Save Student Details
    const updatedStdUserDetails = await studentModel.findOneAndUpdate(
      {stdUserId:id},
      {$set:{
        stdName: name,
        age: age,
        address: address,
        phno: phno,
        stdImg: img,
      }
      },
      { new: true, useFindAndModify: false }
    );

    // Save Student GitHub and Other Info
    const updatedStdUserInfo = await stdDetailsModel.findOneAndUpdate(
      {stdUserId:id},
      {
        $set:{
        projects: projects, // Store fetched GitHub projects
        skills: skills,
        isintern,
        noofinternship,
        gitDetails: repoDetails,
        certificates: certificates,
        }
      },
      { new: true, useFindAndModify: false }
    );

    // Save to Database
    const stdUserDetails = await updatedStdUserDetails.save();
    const stdUserInfo = await updatedStdUserInfo.save();

    res.json({ success: true, data: { stdUserDetails, stdUserInfo } });
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const editStudentDetails = async (req, res) => {
  try {
    const {
      id,
      name,
      age,
      address,
      phno,
      projects,
      skills,
      gitDetails,
      certificates,
      img,
    } = req.body; //assuming it's from req.body
    const updatedStdUserDetails = await studentModel.findOneAndUpdate(
      { stdUserId: id },
      {
        $set: {
          stdName: name,
          age: age,
          address: address,
          phno: phno,
          stdImg: img,
        },
      },
      { new: true, useFindAndModify: false }
    );
    const updatedStdUserInfo = await stdDetailsModel.findOneAndUpdate(
      { stdUserId: id },
      {
        $set: {
          projects: projects,
          skills: skills,
          gitDetails: gitDetails,
          certificates: certificates,
        },
      },
      { new: true, useFindAndModify: false }
    );
    const stdUserDetails = await updatedStdUserDetails.save();
    const stdUserInfo = await updatedStdUserInfo.save();
    res.json({ success: true, data: { stdUserDetails, stdUserInfo } })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getAllStudentDetails = async (req, res) => {
  try {
    const {id} = req.body;
    console.log(id);
    const stdUserDetails = await studentModel.findOne({stdUserId:id});
    const stdUserInfo = await stdDetailsModel.findOne({stdUserId:id});
    res.json({ success: true, data: { stdUserDetails, stdUserInfo } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { registerStudentDetails, editStudentDetails, getAllStudentDetails };
