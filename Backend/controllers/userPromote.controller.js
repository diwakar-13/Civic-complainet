import pool from "../config/db.js";

export const promoteToAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      "UPDATE users SET role = 'ADMIN' WHERE id =$1 RETURNING id name, email, role",
      [userId],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User promoted to ADMIN successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log("Error:" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all users

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.log("Error:" + error);
    res.status(500).json({ message: "Internal server error " });
  }
};
