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

export { getinterns };
