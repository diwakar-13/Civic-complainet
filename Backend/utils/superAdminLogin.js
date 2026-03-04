import pool from "../config/db.js";
import bcrypt from "bcrypt";

// for super adimn
export const superAdminCreateIfNotExist = async (req, res) => {
  try {
    const name = process.env.SUPER_ADMIN_NAME;
    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    // validation
    if (!name || !email || !password) {
      console.log("Super Admin env variables missing");
      return;
    }

    // check in db user exists or not
    const exist_user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (exist_user.rows.length > 0) {
      console.log("Super admin is already exists");
      return;
    }

    // insert into db

    // HASHED PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)",
      [name, email, hashedPassword, "SUPER_ADMIN"],
    );
    console.log("super admin created successfully");
  } catch (error) {
    console.log(error);
  }
};
