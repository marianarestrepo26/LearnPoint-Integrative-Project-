import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET all users
router.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ message: "USER NOT FOUND..." });

    res.json(results[0]);
  });
});

// POST create new user
router.post("/", (req, res) => {
  const { name, last_name, age, email, password, registration_date } = req.body;

  pool.query(
    "INSERT INTO users (name, last_name, age, email, password, registration_date) VALUES (?,?,?,?,?,?)",
    [name, last_name, age, email, password, registration_date],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "USER CREATED!" });
    }
  );
});

// PUT update user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, last_name, age, email, password, registration_date } = req.body;

  pool.query(
    "UPDATE users SET name=?, last_name=?, age=?, email=?, password=?, registration_date=? WHERE id=?",
    [name, last_name, age, email, password, registration_date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "USER NOT FOUND..." });

      res.json({ message: "USER UPDATED" });
    }
  );
});

// DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "USER NOT FOUND..." });

    res.json({ message: "USER ELIMINATED" });
  });
});

export default router;
