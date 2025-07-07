const express = require("express")
const { getNotes, createNote, updateNote, deleteNote, getBudgetSummary } = require("../controllers/noteController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route("/").get(protect, getNotes).post(protect, createNote)

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote)

router.get("/budget/summary", protect, getBudgetSummary)

module.exports = router
