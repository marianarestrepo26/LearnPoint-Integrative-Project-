
import express from "express";
import pool from "../db.js";

const router = express.Router();

// LIST OF RANJING OF TUTORS
router.get("/ranking", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.name,
        u.last_name,
        AVG(CAST(r.ranking AS UNSIGNED)) AS prom_ranking
      FROM tutors t
      JOIN users u ON t.users_id = u.id
      LEFT JOIN reviews r ON r.tutors_id = t.id
      GROUP BY t.id
      ORDER BY prom_ranking DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
