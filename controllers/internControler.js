import studentModel from "../models/student.js";
import stdDetailsModel from "../models/std_details.js";
import axios from "axios";
//posts prompt to the findIntern api to get back response (stdId), map them to student db and return their details in a loop
const getinterns = async (req, res) => {
  try {
    const { prompt, count, isTeam } = req.body;

    const apiResponse = await axios.post(
      "http://127.0.0.1:6000/api/findIntern",
      {
        prompt,
        count,
        isTeam,
      }
    );

    // Ensure response is an array
    const students = apiResponse.data;

    // Fetch details for each student
    const studentDetails = await Promise.all(
      students.map(async (student) => {
        const stdUserDetails = await studentModel.findOne({
          stdUserId: student.stdUserId,
        });
        const stdUserInfo = await stdDetailsModel.findOne({
          stdUserId: student.stdUserId,
        });

        return {
          student_id: student.stdUserId,
          reason: student.reason, // Include reason from API response
          stdUserDetails,
          stdUserInfo,
        };
      })
    );

    res.json({ success: true, data: studentDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMatchedStudents = async (req, res) => {
  try {
    const { prompt, count } = req.body;

    const apiResponse = await axios.post(
      "http://127.0.0.1:5002/match-students",
      {
        prompt,
        count,
      }
    );

    // Extract matched students from the response
    const matchedStudents = apiResponse.data.top_matched_students;

    // Fetch details for each student
    const studentDetails = await Promise.all(
      matchedStudents.map(async (student) => {
        const stdUserDetails = await studentModel.findOne({
          stdUserId: student.user_id,
        });
        const stdUserInfo = await stdDetailsModel.findOne({
          stdUserId: student.user_id,
        });

        // Concatenate rank and score for the reason attribute
        const reason = `rank:${student.rank} | score:${student.score}`;

        return {
          student_id: student.user_id,
          reason: reason,
          stdUserDetails,
          stdUserInfo,
        };
      })
    );

    res.json({ success: true, data: studentDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getRecommendedForStudents = async (req, res) => {
  try {
    const { id, count } = req.body;

    const apiResponse = await axios.post(
      "http://127.0.0.1:5001/api/recommend",
      {
        stdUserId: id,
        count,
      }
    );
    console.log("Sending Request:", { stdUserId: id, count });
    console.log("Received Response:", apiResponse.data);

    res.json({ success: true, data: apiResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { getinterns, getRecommendedForStudents, getMatchedStudents };
