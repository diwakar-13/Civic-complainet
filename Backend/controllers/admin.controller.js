import pool from "../config/db.js";

/*
---------------------------------------
GET Dashboard Stats
---------------------------------------
Returns:
- total complaints
- total pending
- total resolved
*/
export const getDashBoardStats = async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'PENDING') AS pending,
        COUNT(*) FILTER (WHERE status = 'RESOLVED') AS resolved
      FROM complaints
    `;

    const result = await pool.query(statsQuery);

    const { total, pending, resolved } = result.rows[0];

    res.status(200).json({
      success: true,
      data: {
        total: Number(total),
        pending: Number(pending),
        resolved: Number(resolved),
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/*
---------------------------------------
GET Complaints With Optional Filter
---------------------------------------
Query param:
?status=PENDING
*/
export const getComplaintsAdmin = async (req, res) => {
  try {
    // Normalize to uppercase for consistency
    const status = req.query.status?.toUpperCase();

    let query = `
      SELECT complaints.*, users.name, users.email
      FROM complaints
      JOIN users ON complaints.user_id = users.id
    `;

    const values = [];

    if (status) {
      const allowedStatus = ["PENDING", "RESOLVED"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value",
        });
      }

      query += " WHERE complaints.status = $1";
      values.push(status);
    }

    query += " ORDER BY complaints.created_at DESC";

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      complaints: result.rows,
    });
  } catch (error) {
    console.error("Admin Complaints Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


