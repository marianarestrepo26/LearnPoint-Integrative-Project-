import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM users");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await pool.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    if (results.length === 0)
      return res.status(404).json({ message: "USER NOT FOUND..." });

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new user
router.post("/", async (req, res) => {
  try {
    const { name, last_name, age, email, password, registration_date } =
      req.body;

    await pool.query(
      "INSERT INTO users (name,last_name,age,email,password,registration_date) VALUES (?,?,?,?,?,?)",
      [name, last_name, age, email, password, registration_date]
    );

    res.json({ message: "USER CREATED!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_name, age, email, password, registration_date } =
      req.body;

    const [result] = await pool.query(
      "UPDATE users SET name=?, last_name=?, age=?, email=?, password=?, registration_date=? WHERE id=?",
      [name, last_name, age, email, password, registration_date, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "USER NOT FOUND..." });

    res.json({ message: "USER UPDATED" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "USER NOT FOUND..." });

    res.json({ message: "USER ELIMINATED" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
