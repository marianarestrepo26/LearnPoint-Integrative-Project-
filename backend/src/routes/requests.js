import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/**
 * Create class request
 * body: { student_id, skill, message }
 */
router.post("/", async (req, res) => {
  const { student_id, skill, message } = req.body;

  if (!student_id || !skill) {
    return res.status(400).json({ error: "student_id and skill are required" });
  }

  try {
    const conn = await pool.getConnection();

    // 1. Find subject by skill name
    const [subjectRows] = await conn.query(
      "SELECT id FROM subjects WHERE subject_name = ?",
      [skill]
    );

    if (subjectRows.length === 0) {
      conn.release();
      return res.status(404).json({ message: "Skill not found" });
    }

    const subjectId = subjectRows[0].id;

    // 2. Find tutors that meet requirements
    const [tutorRows] = await conn.query(
      `
      SELECT t.id, u.name, u.last_name, IFNULL(AVG(r.ranking), 0) as avg_rating
      FROM tutors t
      JOIN users u ON u.id = t.users_id
      JOIN subjects s ON s.tutors_id = t.id
      LEFT JOIN reviews r ON r.tutors_id = t.id
      WHERE s.id = ?
        AND t.is_verified = 'TRUE'
        AND t.mode_tutoring = 'AVAILABLE'
      GROUP BY t.id
      HAVING avg_rating >= 3.5
      ORDER BY avg_rating DESC
      LIMIT 1
      `,
      [subjectId]
    );

    if (tutorRows.length === 0) {
      conn.release();
      return res.status(404).json({ message: "No tutors match the requirements" });
    }

    const assignedTutor = tutorRows[0];

    // 3. Store request in reservation table
    const [result] = await conn.query(
      `
      INSERT INTO reservation (
        reservation_date, 
        tutor_availability_id, 
        students_id, 
        subjects_id, 
        tutors_id, 
        student_message
      )
      VALUES (CURDATE(), NULL, ?, ?, ?, ?)
      `,
      [student_id, subjectId, assignedTutor.id, message || null]
    );

    conn.release();

    res.status(201).json({
      message: "Request created successfully",
      requestId: result.insertId,
      assignedTutor,
      studentMessage: message || ""
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

/**
 * Get all class requests with details
 */
router.get("/", async (req, res) => {
  try {
    const conn = await pool.getConnection();

    const [rows] = await conn.query(
      `
      SELECT 
        r.id AS request_id,
        r.reservation_date,
        r.student_message,
        u_s.name AS student_name,
        u_s.last_name AS student_lastname,
        u_t.name AS tutor_name,
        u_t.last_name AS tutor_lastname,
        s.subject_name,
        IFNULL(AVG(rv.ranking), 0) as tutor_avg_rating
      FROM reservation r
      JOIN students st ON st.id = r.students_id
      JOIN users u_s ON u_s.id = st.users_id
      JOIN tutors t ON t.id = r.tutors_id
      JOIN users u_t ON u_t.id = t.users_id
      JOIN subjects s ON s.id = r.subjects_id
      LEFT JOIN reviews rv ON rv.tutors_id = t.id
      GROUP BY r.id
      ORDER BY r.reservation_date DESC
      `
    );

    conn.release();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;