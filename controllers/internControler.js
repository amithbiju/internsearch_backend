import studentModel from "../models/student.js";
import stdDetailsModel from "../models/std_details.js";
import axios from "axios";

const getinterns = async (req, res) => {
  try {
    const { prompt, count } = req.body;

    const apiResponse = await axios.post("https://your-external-api.com", {
      prompt,
      count,
    });

    // Extract student IDs from the response
    const studentIds = apiResponse.data.map((student) => student.student_id);

    // Fetch details for each student
    const studentDetails = await Promise.all(
      studentIds.map(async (id) => {
        const stdUserDetails = await studentModel.findById(id);
        const stdUserInfo = await stdDetailsModel.findById(id);
        return {
          student_id: student.student_id,
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
