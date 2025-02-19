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
    const newStdUserDetails = new studentModel({
      stdUserId: id,
      stdName: name,
      age: age,
      address: address,
      phno: phno,
      stdImg: img,
    });

    // Save Student GitHub and Other Info
    const newStdUserInfo = new stdDetailsModel({
      stdUserId: id,
      projects: projects, // Store fetched GitHub projects
      skills: skills,
      isintern,
      noofinternship,
      gitDetails: repoDetails,
      certificates: certificates,
    });

    // Save to Database
    const stdUserDetails = await newStdUserDetails.save();
    const stdUserInfo = await newStdUserInfo.save();

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

    const updatedStdUserDetails = await studentModel.findByIdandUpdate({
      stdUserId: id,
      stdName: name,
      age: age,
      address: address,
      phno: phno,
      stdImg: img,
    });
    const updatedStdUserInfo = await stdDetailsModel.findByIdandUpdate({
      stdUserId: id,
      projects: projects,
      skills: skills,
      gitDetails: gitDetails,
      certificates: certificates,
    });
    const stdUserDetails = await updatedStdUserDetails.save();
    const stdUserInfo = await updatedStdUserInfo.save();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getAllStudentDetails = async (req, res) => {
  try {
    const id = req.body;
    const stdUserDetails = await studentModel.findById(id);
    const stdUserInfo = await stdDetailsModel.findById(id);
    res.json({ success: true, data: { stdUserDetails, stdUserInfo } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { registerStudentDetails, editStudentDetails, getAllStudentDetails };
