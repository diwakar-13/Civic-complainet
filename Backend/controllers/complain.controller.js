import pool from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

// create complaint

export const createComplaint = async (req, res) => {
  try {
    const { title, description, longitude, latitude } = req.body;

    // validation
    if (!title || !description) {
      return res.status(400).json({ message: "All field are required" });
    }

    // req.user comes from auth middleware
    const userId = req.user.id;

    let imageUrl = null;

    // Upload image if provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "smart_civic_complaints" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // Convert lat/lng to numbers safely
    const lat = latitude ? parseFloat(latitude) : null;
    const lng = longitude ? parseFloat(longitude) : null;

    // insert data into db
    const result = await pool.query(
      `INSERT INTO complaints(user_id,title,description, image_url,latitude,longitude) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [userId, title, description, imageUrl, lat, lng],
    );

    res.status(200).json({
      message: "Complaint created successfully",
      complaint: result.rows[0],
    });
  } catch (error) {
    console.log("Error:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user all complaint

export const getComplain = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT * FROM complaints WHERE user_id=$1 ORDER BY created_at DESC",
      [userId],
    );
    res.status(200).json({ complaint: result.rows });
  } catch (error) {
    console.log("Error:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// for admin get all complainet

export const getAllComplaint = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      c.id,
      c.title,
      c.description,
      c.status,
      c.created_at,
      c.image_url,
      c.latitude,
      c.longitude,
      u.email
      FROM complaints c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
       `);
    return res.status(200).json({
      message: "get complainet successfully",
      total: result.rows.length,
      complaint: result.rows,
    });
  } catch (error) {
    console.log("Error:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update pending and resolved

export const updateComplainetstatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    if (!["PENDING", "RESOLVED"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const result = await pool.query(
      "UPDATE complaints SET status =$1 WHERE id=$2 RETURNING *",
      [status, complaintId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      message: "Complaint status updated successfully",
      complaint: result.rows[0],
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
